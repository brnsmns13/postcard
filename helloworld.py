import webapp2

from google.appengine.api import users


class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.write('Hello, World')


class TestPage(webapp2.RequestHandler):
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


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/test', TestPage),
    ('/auth', Auth)
], debug=True)
