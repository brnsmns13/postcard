import webapp2


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


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/test', TestPage)
], debug=True)
