urlList = ["https://guidestarindia.org/List_of_NGOs.aspx#'Monthwiselist'",
"https://guidestarindia.org/List_of_NGOs_2016-17.aspx",
"https://guidestarindia.org/List_of_NGOs_2015-16.aspx"]
import requests
from bs4 import BeautifulSoup
from utils import *
idList = []
def function(url):
    soup = BeautifulSoup(requests.get(url).text,"html.parser")
    div = soup.find("tbody")
    t = "http://www.guidestarindia.org/Summary.aspx?CCReg="
    # divs = table.findAll('div')
    for x in div.getText().split():
        if t in x:
            if x not in idList:
                idList.append(x)
for i in urlList:
    function(i)
writeJsonFile('data/urls.json',idList)