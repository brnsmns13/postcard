from google.appengine.ext import ndb


class Board(ndb.Model):
    name = ndb.StringProperty()
    tags = ndb.StringProperty(repeated=True)
    panels = ndb.KeyProperty(repeated=True)


class Card(ndb.Model):
    board_id = ndb.KeyProperty(required=True)
    panel_id = ndb.KeyProperty(required=True)
    subject = ndb.StringProperty()
    content = ndb.TextProperty()
    tags = ndb.StringProperty(repeated=True)
    comments = ndb.StringProperty(repeated=True)


class Panel(ndb.Model):
    name = ndb.StringProperty()


class Filter(ndb.Model):
    f_type = ndb.StringProperty()
    f_string = ndb.StringProperty()
    tag = ndb.StringProperty()
