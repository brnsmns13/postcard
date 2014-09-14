import json
import webapp2
from google.appengine.api import users
from google.appengine.ext import ndb
import models


def createDefaultBoard(user):
    email = user.email()
    board = models.Board(id=email, name="Gmail")
    panels = []
    panels.append(str(models.Panel(name="To Do", user_id=email).put().id()))
    panels.append(str(models.Panel(name="In Progress", user_id=email).put().id()))
    panels.append(str(models.Panel(name="Done", user_id=email).put().id()))
    board.panels = panels
    board.put()
    return board


class BoardHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.response.set_status(403)
            return
        email = user.email()
        board = models.Board.get_by_id(email)
        if not board:
            board = createDefaultBoard(user)

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(board.to_json_dict()))


class BoardDataHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.response.set_status(403)
            return

        # Get the panels
        board = models.Board.get_by_id(user.email())
        panels = [models.Panel.get_by_id(int(i)) for i in board.panels]

        # Get Cards
        cards = models.Card.query(models.Card.user_id == user.email()).fetch(50)

        data = []
        for p in panels:
            p_dict = p.to_json_dict()
            p_dict['cards'] = []
            for card in cards:
                if card.panel_id.id() == str(p.key.id()):
                    p_dict['cards'].append(card.to_json_dict())
            data.append(p_dict)

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(data))


class PanelHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.response.set_status(403)
            return
        board = models.Board.get_by_id(user.email())
        panels = [models.Panel.get_by_id(int(i)) for i in board.panels]
        out_panels = []
        for p in panels:
            panel_json = p.to_json_dict()
            out_panels.append(panel_json)
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps({'panels': out_panels}))


class CardHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.response.set_status(403)
            return

        cards = models.Card.query(models.Card.user_id == user.email()).fetch(50)
        output = {}
        for card in cards:
            card_json = card.to_json_dict()
            output[str(card.key)] = card_json

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(output))

    def post(self):
        user = users.get_current_user()
        if not user:
            self.response.set_status(403)
            return
        card_id = self.request.get('card_id')
        panel_id = self.request.get('panel_id')
        card = models.Card.get_by_id(card_id)
        panel_key = ndb.Key('Panel', panel_id)
        card.panel_id = panel_key
        card.put()


endpoints = [
    ('/api/boards', BoardHandler),
    ('/api/panels', PanelHandler),
    ('/api/cards', CardHandler),
    ('/api/all', BoardDataHandler)
]
