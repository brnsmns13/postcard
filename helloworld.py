import webapp2

from apiclient.discovery import build
from oauth2client.appengine import OAuth2Decorator

decorator = OAuth2Decorator(
    client_id=('34807265940-t06q5hjq3cepa2f0s38lhsc90ose631g'
               '.apps.googleusercontent.com'),
    client_secret='SvnqyVoRJv8soNbcAuuv_OQ7',
    scope='https://www.googleapis.com/auth/gmail.modify')

service = build('gmail', 'v1')


class GetMail(webapp2.RequestHandler):
    @decorator.oauth_required
    def get(self):
        if decorator.has_credentials():
            self.response.out.write('<b>Authed</b>')
            http = decorator.http()
            messages = service.users().messages().list(
                userId='me', maxResults=15).execute(http=http)
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
    ('/', GetMail),
    (decorator.callback_path, decorator.callback_handler()),

], debug=True)
