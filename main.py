import os
import webapp2
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class PostBox(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

class Sound(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('AudioStuff/WebServer/AudioRecording.html')
        self.response.write(template.render())

application = webapp2.WSGIApplication([
    ('/', PostBox),
    ('/sound', Sound)
], debug=True)
