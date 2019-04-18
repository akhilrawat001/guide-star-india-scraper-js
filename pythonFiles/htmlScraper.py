# urlList = ["https://guidestarindia.org/List_of_NGOs.aspx#'Monthwiselist'",
# "https://guidestarindia.org/List_of_NGOs_2016-17.aspx",
# "https://guidestarindia.org/List_of_NGOs_2015-16.aspx"]
import requests,os
from bs4 import BeautifulSoup
from utils import *
idList = []
def function(fileName):
    notfound = readJsonFile('data/notfound.json')
    if os.path.exists('htmls/'+str(fileName)+'.json') == False and str(fileName) not in notfound:
        url = "http://www.guidestarindia.org/Summary.aspx?CCReg="+ str(fileName)
        soup = requests.get(url).text
        if "Charity not found/Invalid Primary Registration Number" not in soup and "Forbidden: Access is denied" not in soup:
            writeJsonFile('htmls/'+str(fileName)+'.json',soup)
            data = readJsonFile('data/urls.json')
            if url not in data:
                data.append(url)
            writeJsonFile('data/urls.json',data)
            print("CREATED" ,fileName)

        else:
            notfound.append(str(fileName))
            writeJsonFile('data/notfound.json',notfound)
            print("NOT FOUND",fileName)
    else:
        data = readJsonFile('data/urls.json')
        url = "http://www.guidestarindia.org/Summary.aspx?CCReg="+ str(fileName)
        if url not in data and os.path.exists('htmls/'+str(fileName)+'.json'):
            data.append(url)
            print('changes made')
            writeJsonFile('data/urls.json',data)
        print("DONE" ,fileName)
for i in range(9020,9021):
    function(i)
