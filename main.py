import base64
import logging
import jinja2
import webapp2
import os
import json

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
        messages = service.users().messages().list(
            userId='me',
            maxResults=3,
            q='in:inbox').execute(http=http)
        for m in messages['messages']:
            e = service.users().messages().get(
                userId='me',
                id=m['id'],
                format='full').execute(http=http)
            payload = e['payload']

            subject = self.get_message_subject(payload)
            content = self.get_message_content(payload)
            # tags = self.get_message_tags(payload)
            card = models.Card(board_id=board.key)
            card.panel_id = ndb.Key('Panel', board.panels[0])
            card.subject = subject
            card.content = content
            # card.tags = tags
            card.user_id = user.email()
            card.put()
        self.response.out.write(len(messages))

    def get_message_subject(self, payload):
        for h in payload['headers']:
            if h.get('name') == 'Subject':
                return h.get('value')

    def get_message_tags(self, payload):
        filters = models.Filter.query().get()
        tag_list = []
        for i in payload['headers']:
            for f in filters:
                if (i['name'] == f['type']):
                    tag_list.append(f['tag'])

        return tag_list

    def get_message_content(self, payload):
        content = ''
        logging.info('payload mimeType: ' + payload['mimeType'])
        if payload['body'].get('size') > 0:
            content += self.read_b64(payload['body'].get('data'))

        for part in payload['parts']:
            logging.info('part mimeType: ' + part['mimeType'])
            if part['mimeType'] == 'text/plain':
                content += self.read_b64(part['body'].get('data'))
                logging.info('Content: ' + content)

            elif part['mimeType'] == 'text/html':
                content += self.read_b64(part['body'].get('data'))

            elif part['mimeType'] == 'multipart/alternative':
                content += self.get_message_content(part)

        return content

    def read_b64(self, data):
        return base64.urlsafe_b64decode(data.encode('utf-8')) or ''


class CardsAPI(webapp2.RequestHandler):
    @decorator.oauth_required
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
    (decorator.callback_path, decorator.callback_handler()),
]
endpoints += api_endpoints

application = webapp2.WSGIApplication(endpoints, debug=True)
