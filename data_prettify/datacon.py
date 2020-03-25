import json
with open('data.json') as json_file:
    data = json.load(json_file)

newdata = []
for index,i in enumerate(data):
    data[i]["Username"] = i
    newdata.append(data[i])
with open('newdata.json', 'w') as f:
    json.dump(newdata, f, ensure_ascii=False)
