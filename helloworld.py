import json
import logging
import webapp2

from google.appengine.api import users
from apiclient.discovery import build
from oauth2client.appengine import OAuth2Decorator

decorator = OAuth2Decorator(
    client_id='34807265940-t06q5hjq3cepa2f0s38lhsc90ose631g.apps.googleusercontent.com',
    client_secret='SvnqyVoRJv8soNbcAuuv_OQ7',
    scope='https://www.googleapis.com/auth/gmail.modify')

service = build('gmail', 'v1')


class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.write(
            """
            <html><head>
            <script src="/build/react.js"></script>
            <link type="text/css" rel="stylesheet" href="/css/main.css" />
            <link type="text/css" rel="stylesheet" href="/css/bootstrap.min.css" />
            </head>
            <body>
            <h1>Hello World</h1>
            <div id="content" class="container"></div>
            <script src="/build/main.js"></script>
            </body></html>
            """)


class Auth(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            greeting = ('Welcome, %s! (<a href="%s">sign out</a>)' %
                        (user.nickname(), users.create_logout_url('/')))
        else:
            greeting = ('<a href="%s">Sign in or register</a>.' %
                        users.create_login_url('/'))

        self.response.out.write('<html><body>%s</body></html>' % greeting)


class GetMail(webapp2.RequestHandler):

    @decorator.oauth_required
    def get(self):
        if decorator.has_credentials():
            self.response.out.write('<b>Authed</b>')
            user = users.get_current_user()
            http = decorator.http()
            user_id = user.user_id()
            messages = service.users().messages().list(userId='me').execute(http=http)
            self.response.out.write('<br>')
            self.response.out.write(messages)
            self.response.out.write('<br>')
            self.response.out.write(dir(decorator))
            self.response.out.write('<br>')
            for m in messages['messages']:
                self.response.out.write('<li>%s</li>' % m)

        else:
            self.response.out.write('Not authed')


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/auth', Auth),
    ('/mail', GetMail),
    (decorator.callback_path, decorator.callback_handler()),

], debug=True)
