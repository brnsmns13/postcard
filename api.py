import json
import webapp2
from google.appengine.api import users
import models

class BoardHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.response.set_status(403)
            return
        email = user.email()
        board = models.Board.get_by_id(email)
        if not board:
            board = models.Board(id=email)
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(board.to_json_dict()))


class CardHandler(webapp2.RequestHandler):
    def get(self):
        output = {}
        for card in models.Card.query().fetch(30):
            card_json = card.to_json_dict()
            output[str(card.key)] = card_json

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(output))

endpoints = [
    ('/api/boards', BoardHandler),
    ('/api/cards', CardHandler)
]
