from utils import *
finalList = []
data = readJsonFile("data/notfound1.json")
for x in data:
    if x not in finalList:
        finalList.append(x)
print("done")
data = readJsonFile("data/notfound2.json")
for x in data:
    if x not in finalList:
        finalList.append(x)
print("done")
writeJsonFile('data/notfound.json',finalList)
print("done")