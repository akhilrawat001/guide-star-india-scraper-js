# urlList = ["https://guidestarindia.org/List_of_NGOs.aspx#'Monthwiselist'",
# "https://guidestarindia.org/List_of_NGOs_2016-17.aspx",
# "https://guidestarindia.org/List_of_NGOs_2015-16.aspx"]
import requests,os
from bs4 import BeautifulSoup
from utils import *
idList = []
def function(fileName):
    if os.path.exists('htmls/'+str(fileName)+'.json') == False:
        url = "http://www.guidestarindia.org/Summary.aspx?CCReg="+ str(fileName)
        soup = requests.get(url).text
        if "Charity not found/Invalid Primary Registration Number" not in soup:
            writeJsonFile('htmls/'+str(fileName)+'.json',soup)
            data = readJsonFile('data/urls.json')
            if url not in data:
                data.append(url)
            writeJsonFile('data/urls.json',data)
        else:
            print("NOT FOUND")
    print(fileName)
for i in range(100,11000):
    function(i)
