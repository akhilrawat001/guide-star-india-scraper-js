import requests,os
from utils import *
urlList = readJsonFile('data/urls.json')
from threading import Thread
def getData(url,name):
    if os.path.exists("htmls/" + name + ".json"):
        print('Completed')
    else:
        print('Thread Started')
        data = requests.get(url)
        writeJsonFile("htmls/" + name + ".json",data.text)
        print("Thread Ended")

for i in urlList[:1200]:
    name = i.split("=")[1]
    thread = Thread(target=getData,args = (i,name,))
    thread.start()       
    # print("Thread",urlList.index(i))




# try:
#   print(x)
# except NameError:
#   print("Variable x is not defined")
# except:
#   print("Something else went wrong")