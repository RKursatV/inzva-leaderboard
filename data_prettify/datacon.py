import json
from collections import OrderedDict

with open('data.json') as json_file:
    data = json.load(json_file)

newdata = []
data = OrderedDict(sorted(data.items(), key=lambda x: (x[1]["Rating"],sorted(x[1]["Rating History"].keys())[-1]),reverse=True))

for index,i in enumerate(data):
    data[i]["Username"] = i
    data[i]["rank"] = index+1
    newdata.append(data[i])
with open('newdata.json', 'w') as f:
    json.dump(newdata, f, ensure_ascii=False)
