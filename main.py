import base64
import logging
import jinja2
import webapp2
import os
import json
from email.mime.text import MIMEText

from apiclient.discovery import build
from google.appengine.api import users
from google.appengine.ext import ndb
from oauth2client.appengine import OAuth2Decorator

import models
from api import createDefaultBoard
from api import endpoints as api_endpoints

decorator = OAuth2Decorator(
    client_id=('34807265940-t06q5hjq3cepa2f0s38lhsc90ose631g'
               '.apps.googleusercontent.com'),
    client_secret='SvnqyVoRJv8soNbcAuuv_OQ7',
    scope='https://www.googleapis.com/auth/gmail.modify')

service = build('gmail', 'v1')

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class FilterHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.response.set_status(403)
            return

        tag = self.request.get('tag')
        filtertag = models.Filter.tag

        _filter = models.Filter.query(filtertag == tag).get()

        print _filter.to_json_dict()
        return

    def post(self):
        user = users.get_current_user()
        if not user:
            self.response.set_status(403)
            return
        email = user.email()

        tag = self.request.get('tag')
        f_Type = self.request.get('f_type')
        f_String = self.request.get('f_string')

        _filter = models.Filter(
            f_type=f_Type, f_string=f_String, tag=tag, user_id=email,
            board_id=ndb.Key('Board', email))
        _filter.put()
        return

    def delete(self):
        user = users.get_current_user()
        if not user:
            self.response.set_status(403)
            return
        tag = self.request.get('tag')

        # _filter = ndb.Key(models.Filter, 5348024557502464)

        # _filter.delete()

        #ndb.Key('tag', tag).delete()
        filtertag = models.Filter.tag
        _filters = models.Filter.query(filtertag==tag).fetch()

        for f in _filters:
            f.key.delete()

        return

class PostBox(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())


class GetMail(webapp2.RequestHandler):
    @decorator.oauth_required
    def get(self):
        user = users.get_current_user()
        if not user:
            greeting = ('<a href="%s">Sign in or register</a>.' %
                        users.create_login_url('/'))
            self.response.out.write('<html><body>%s</body></html>' % greeting)
            return

        greeting = ('Welcome, %s! (<a href="%s">sign out</a>)' %
                    (user.nickname(), users.create_logout_url('/')))
        self.response.out.write('<b>Authed</b>' + greeting)
        board = models.Board.get_by_id(user.email())
        if not board:
            board = createDefaultBoard(user)

        http = decorator.http()
        if board.history_id:
            mail_list = service.users().history().list(
                userId='me',
                startHistoryId=board.history_id).execute(http=http)
            changes = mail_list['history'] if 'history' in mail_list else []
            messages = list(c['messages'][0] for c in changes)
        else:
            mail_list = service.users().messages().list(
                userId='me',
                maxResults=10,
                q='in:inbox').execute(http=http)
            messages = mail_list.get('messages', [])
        board.history_id = None
        history_id = 0
        for m in messages:
            e = service.users().messages().get(
                userId='me',
                id=m['id'],
                format='full').execute(http=http)
            if e.get('historyId') and int(e.get('historyId')) > history_id:
                history_id = int(e.get('historyId'))
            payload = e['payload']

            subject, sender = self.get_message_data(payload)
            content = self.get_message_content(payload)
            tags = self.get_message_tags(payload)
            card = models.Card(board_id=board.key)
            card.panel_id = ndb.Key('Panel', board.panels[0])
            card.subject = subject
            card.sender = sender
            card.content = content
            card.tags = tags
            card.user_id = user.email()
            card.put()
        if history_id:
            board.history_id = str(history_id)
            board.put()
        self.response.out.write(
            '<p>Generated <b>%s</b> new cards</p>' % len(messages))

    def get_message_data(self, payload):
        m_subject = ''
        m_from = ''
        for h in payload['headers']:
            if h.get('name') == 'Subject':
                m_subject = h.get('value')
                continue
            elif h.get('name') == 'From':
                m_from = h.get('value')
                continue
        return m_subject, m_from

    def get_message_tags(self, payload):
        filters = models.Filter.query().fetch()
        tag_list = []
        for header in payload.get('headers', []):
            for f in filters:
                if (header['name'] == f.f_type):
                    if f.f_string in header['value']:
                        tag_list.append(f.tag)

        return tag_list

    def get_message_content(self, payload):
        content = ''
        logging.info('payload mimeType: ' + payload['mimeType'])
        if payload['body'].get('size') > 0:
            content += self.read_b64(payload['body'].get('data'))

        for part in payload.get('parts', []):
            if part['mimeType'] == 'text/plain':
                content += self.read_b64(part['body'].get('data'))

            elif part['mimeType'] == 'text/html':
                content += self.read_b64(part['body'].get('data'))

            elif part['mimeType'] == 'multipart/alternative':
                content += self.get_message_content(part)

        return content

    def read_b64(self, data):
        if not data:
            return ''
        return base64.urlsafe_b64decode(data.encode('utf-8')) or ''


class MailHandler(webapp2.RequestHandler):
    @decorator.oauth_required
    def post(self):
        user = users.get_current_user()
        if not user:
            greeting = ('<a href="%s">Sign in</a>.' %
                        users.create_login_url('/'))
            self.response.out.write('<html><body>%s</body></html>' % greeting)
            return

        http = decorator.http()
        message = MIMEText(self.request.get('content'))
        message['from'] = user.email()
        message['subject'] = self.request.get('subject')
        message['to'] = self.request.get('to')

        raw_message = {'raw': base64.urlsafe_b64encode(message.as_string())}
        sent = service.users().messages().send(
            userId='me', body=raw_message).execute(http=http)
        logging.info('Sent id: ' + sent['id'])


class CardsAPI(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        cards = models.Card.query(models.Card.user_id == user.email()).fetch(20)
        for c in cards:
            self.response.out.write('<h3>%s</h3>' % c.subject)
            self.response.out.write('<p>%s</p>' % c.content)


endpoints = [
    ('/', PostBox),
    ('/generate_user_cards', GetMail),
    ('/cards', CardsAPI),
    ('/filter', FilterHandler),
    ('/api/send', MailHandler),
    (decorator.callback_path, decorator.callback_handler()),
]
endpoints += api_endpoints

application = webapp2.WSGIApplication(endpoints, debug=True)
