from utils import *
finalList = []
data = readJsonFile("data/url.json")
for x in data:
    if x not in finalList:
        finalList.append(x)
print("done")
data = readJsonFile("data/url2.json")
for x in data:
    if x not in finalList:
        finalList.append(x)
print("done")
data = readJsonFile("data/url3.json")
for x in data:
    if x not in finalList:
        finalList.append(x)
print("done")
data = readJsonFile("data/url4.json")
for x in data:
    if x not in finalList:
        finalList.append(x)
writeJsonFile('data/urls.json',finalList)
print("done")