import json

import models


def get_tags(j):
    # filters = [{'type':'From', 'param':'@twitter.com', 'tag':'twitter'}, {'type':'To', 'param':'simkev2@gmail.com', 'tag':'todo'}]
    filters = models.Filter.query().get()
    tag_list = []
    for i in j['payload']['headers']:
        for f in filters:
            if (i['name'] == f['type']):
                print i['name'] + ': ' + i['value']
                tag_list.append(f['tag'])

    return tag_list


if __name__ == '__main__':
    json_data = open("email.json")
    j = json.loads(json_data.read())

    print get_tags(j)
