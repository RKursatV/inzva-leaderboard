import json
from collections import OrderedDict

with open('data.json') as json_file:
    data = json.load(json_file)

newdata = []
data = OrderedDict(sorted(data.items(), key=lambda x: (x[1]["Rating"],sorted(x[1]["Rating History"].keys())[-1]),reverse=True))
rank,val = 0,1337
for index,i in enumerate(data):
    data[i]["Username"] = i
    if(data[i]["Rating"]) < val:
        rank += 1
        val = data[i]["Rating"]
    data[i]["rank"] = rank
    newdata.append(data[i])
with open('newdata.json', 'w') as f:
    json.dump(newdata, f, ensure_ascii=False)

