import json
import webapp2

import models


class CardHandler(webapp2.RequestHandler):
    def get(self):
        output = {}
        for card in models.Card.query().fetch(30):
            card_json = card.to_json_dict()
            output[str(card.key)] = card_json

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(output))

endpoints = [
    ('/api/cards', CardHandler)
]
