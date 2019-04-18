import requests,os
from bs4 import BeautifulSoup
from utils import *
fileName = 9020
url = "http://www.guidestarindia.org/Summary.aspx?CCReg="+ str(fileName)
writeJsonFile('htmls/' + str(fileName) + '.json',requests.get(url).text)