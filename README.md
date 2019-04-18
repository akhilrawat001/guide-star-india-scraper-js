# Guide Star India Scraper

## Description
I have made the scraper to scrape the important data of over 9000 NGOs.
The Scraper is partially made in **Python** and partially in **JavaScript**.
The process of creating caches of the **HTML** of all the urls is done in **Python** and the process of scraping data from those cached **HTML** files is done in **JavaScript**.

## Process
##### Loop over 9000 pages.
##### 9000 htmls cached in json files.
##### Scraper run over cached html files.
##### Scrapped data stored in JSONs.
##### Scrapped data also converted into CSV.

## Result
CSV can be imported to google sheets and then the data can be used in many different ways.

## Sample Json
```{
  "contacts": [
    {
      "name": "Kalpana Nilkantrao Patil",
      "email": "phadsesanjay777@gmail.com",
      "designation": "Secretary",
      "mobile": [
        "91-2465-219178",
        "91-9370122567"
      ]
    }
  ],
  "guideStarURL": "http://www.guidestarindia.org/Summary.aspx?CCReg=9723",
  "name": "MAHATMA BASHWESHWAR SEVA BHAVI SANSTHA",
  "primaryEmail": "phadsesanjay777@gmail.com",
  "organisationType": [
    "Advocacy & Campaigning",
    "Intermediary",
    "Network",
    "Support"
  ],
  "telephone": [
    "919370122567",
    "919284708399"
  ],
  "mainAddrress": {
    "state": "Maharashtra",
    "address": [
      "Near Hanuman Mandir , Machnoor",
      "Tq - Biloli",
      "Biloli",
      "Nanded",
      "Maharashtra",
      "431711"
    ]
  },
  "briefDescription": "Our NGO is working in Rural Area with SHG members. Rural Development, our ngo three progect available in rural area .",
  "yearOfEstablishment": "2007"
}
```
