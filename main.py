import os
import webapp2

from apiclient.discovery import build
from oauth2client.appengine import OAuth2DecoratorFromClientSecrets


decorator = OAuth2DecoratorFromClientSecrets(
    os.path.join(os.path.dirname(__file__), 'client_secret.json'),
    'https://www.googleapis.com/auth/tasks')

service = build('tasks', 'v1')


class MainHandler(webapp2.RequestHandler):
    @decorator.oauth_required
    def get(self):
        tasks = service.tasks().list(tasklist='@default').execute(
            http=decorator.http())
        self.response.write('<html><body><ul>')
        for task in tasks['items']:
            self.response.write('<li>%s</li>' % task['title'])
            self.response.write('</ul></body><html>')

application = webapp2.WSGIApplication([
    ('/', MainHandler),
    (decorator.callback_path, decorator.callback_handler()),
    ], debug=True)
