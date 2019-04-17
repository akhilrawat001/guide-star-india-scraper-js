// importing all the modules
const cheerio = require('cheerio');
const Papa = require('papaparse')
const CSVLIST = []
const fs = require('fs');
const { readJsonFile, writeJsonFile } = require('./utils.js');
// getting the list of all urls
var urlList = readJsonFile('data/urls.json')
const STATES = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal']
// function which will get NGO data
const getNGOdata = (fileName, url) => {
    let contact = {}
    // CSV dummy Data
    let dummyData = {
        "Name": null,
        "Org Type 1": null,
        "Org Type 2": null,
        "Org Type 3": null,
        "Org Type 4": null,
        "Org Type 5": null,
        "Org Type 6": null,
        "Primary eMail": null,
        "Website": null,
        "Telephones": null,
        "Main Address": null,
        "Main Address State": null,
        "Registered Address": null,
        "Registered Address State": null,
        "Contact 1 Name": null,
        "Contact 1 Designation": null,
        "Contact 1 eMail": null,
        "Contact 1 Telephones": null,
        "Contact 2 Name": null,
        "Contact 2 Designation": null,
        "Contact 2 eMail": null,
        "Contact 2 Telephones": null,
        "Brief Information": null,
        "Year of Establishment": null,
        "GuideStar Url": null
    }
    let dataObject = {}
    dataObject.contacts = []
    // guidestar url
    dataObject.guideStarURL = url
    // reading the file
    let response = readJsonFile('htmls/' + fileName + '.json')
    let $ = cheerio.load(response);
    $("table.CTPDataTable").each((index, element) => {
        let tableName = $(element).find('span.CTPDataHeading').text().trim()
        if (index == 0) {
            let basicData = []
            // name
            dataObject.name = tableName
            $(element).find('span').each((i, ele) => {
                let obj = $(ele).text().trim()
                if (basicData.indexOf(obj) == -1) {
                    basicData.push(obj)
                }
            })
            for (let x of basicData) {
                if (x.includes("Organisation Primary Email Address\n")) {
                    // primary email
                    let primaryEmail = x.split('\n')[1].trim()
                    dataObject.primaryEmail = primaryEmail

                } else if (x.includes("Organisation Website\n")) {
                    // website
                    let website = x.split('\n')[1].trim()
                    dataObject.website = website

                } else if (x.includes("Organisation Type\n")) {
                    // organisation type
                    let rawType = x.split('\n')
                    let organisationType = []
                    for (let x of rawType) {
                        if (x != '\t' && x != 'Organisation Type') {
                            organisationType.push(x)
                        }
                    }
                    dataObject.organisationType = organisationType

                } else if (x.includes("Telephone\n")) {
                    // telephone
                    let number = ""
                    let telephone = []
                    for (let t of x.split("\n")) {
                        if (t.includes('\t')) {
                            if (t.trim('\t').length > 4) {
                                number += t.trim('\n')
                                telephone.push(number)
                                number = ""
                            } else {
                                number += t.trim('\n')
                            }
                        }

                    }
                    dataObject.telephone = telephone
                }
            }
            // main address (address,state)
            let mAddress = {}
            let address = []
            let start = basicData.indexOf('Address') + 1
            let end = basicData.indexOf('Telephone') - 1
            for (let i = start; i < end; i++) {
                let place = basicData[i].trim()
                if (address.indexOf(place) == -1 && (!place.includes(".pdf")) && place != "Back To Top" && place != "Registered Address" && place != "") {
                    address.push(place)
                    if (STATES.indexOf(place) != -1) {
                        mAddress.state = place
                    }
                }
            }
            mAddress.address = address
            dataObject.mainAddrress = mAddress
        } else if (tableName == "Organisation Profile") {
            let tempData = []
            $(element).find("div.CPBData").each((i, ele) => {
                tempData.push($(ele).text().trim())
            })
            for (let x of tempData) {
                if (x.includes('Brief Description')) {
                    // brief Information
                    dataObject.briefDescription = x.split('\n')[1].trim('\t')

                } else if (x.includes('Year of Establishment')) {
                    // year of establishment
                    dataObject.yearOfEstablishment = x.split('\n')[1].trim('\t')

                }

            }
            var save = 0
            var indexes = []
            $(element).find("table").each((i, ele) => {
                let tdata = $(ele).text().trim().split('\n')
                if (tdata.indexOf('Name') != -1) {
                    save = i + 1

                    for (let p in tdata) {
                        if (tdata[p].includes('Name')) {
                            indexes.push(parseInt(p))
                        } else if (tdata[p].includes('Designation')) {
                            indexes.push(parseInt(p))
                        } else if (tdata[p].includes('Email')) {
                            indexes.push(parseInt(p))
                        }
                    }
                }
                else if (i == save) {
                    // contacts (name,designation,email)
                    if (tdata[indexes[0]] != undefined) {
                        if ((!tdata[indexes[0]].includes('Show')) && !tdata[indexes[0]].includes("Hide")) {
                            contact.name = tdata[indexes[0]].trim().trim('\n')
                        }
                    } else {
                        contact.name = null
                    }
                    if (tdata[indexes[1]] != undefined) {
                        if ((!tdata[indexes[1]].includes('Show')) && !tdata[indexes[1]].includes("Hide")) {
                            contact.designation = tdata[indexes[1]].trim().trim('\n')
                        }
                    } else {
                        contact.designation = null
                    } if (tdata[indexes[2]] != undefined) {
                        if ((!tdata[indexes[2]].includes('Show')) && !tdata[indexes[2]].includes("Hide")) {
                            contact.email = tdata[indexes[2]].trim().trim('\n')
                        }
                    } else {
                        contact.email = null
                    }
                    indexes = []

                } else if (tdata.includes('Telephone') || tdata.includes('Mobile')) {
                    // contacts (mobile)
                    var numbers = []
                    for (let x of tdata) {
                        if (x.includes('0') || x.includes('1') || x.includes('2') || x.includes('3') || x.includes('4') || x.includes('5') || x.includes('6') || x.includes('7') || x.includes('8') || x.includes('9')) {
                            numbers.push(x.trim('\t').trim())
                        }
                    } contact.mobile = []
                    contact.mobile = numbers
                    // console.log(numbers)
                }
                else if (contact.hasOwnProperty("mobile") || contact.hasOwnProperty("name")) {
                    // console.log(contact)
                    dataObject.contacts.push(contact)
                    contact = {}
                }//console.log(dataObject.contacts)
            })
        }
        else if (tableName == "Registered Address") {
            // registered address (address,state)
            let rAddress = {}
            let address = []
            $(element).find('span').each((i, childElement) => {
                let place = $(childElement).text().trim()
                if (address.indexOf(place) == -1 && (!place.includes(".pdf")) && place != "Back To Top" && place != "Registered Address" && place != "") {
                    address.push(place)
                    if (STATES.indexOf(place) != -1) {
                        rAddress.state = place
                    }
                }
            })
            rAddress.address = address
            dataObject.regiseredAddrress = rAddress
        }
    })
    // console.log(dataObject)
    writeJsonFile('JSONS/' + fileName + ".json", dataObject)
    if (dataObject.hasOwnProperty("name")) { dummyData['Name'] = dataObject.name }
    if (dataObject.hasOwnProperty("website")) { dummyData['Website'] = dataObject.website }
    if (dataObject.hasOwnProperty("yearOfEstablishment")) { dummyData['Year of Establishment'] = dataObject.yearOfEstablishment }
    if (dataObject.hasOwnProperty("email")) { dummyData['Primary eMail'] = dataObject.email }
    if (dataObject.hasOwnProperty("telephone")) { dummyData['Telephones'] = dataObject.telephone.join(',') }
    if (dataObject.hasOwnProperty("briefDescription")) { dummyData['Brief Information'] = dataObject.briefDescription }
    if (dataObject.hasOwnProperty("guideStarURL")) { dummyData['GuideStar Url'] = dataObject.guideStarURL }
    if (dataObject.hasOwnProperty("regiseredAddrress")) { dummyData['Registered Address'] = dataObject.regiseredAddrress.address.join(","); dummyData['Registered Address State'] = dataObject.regiseredAddrress.state; }
    if (dataObject.hasOwnProperty("mainAddrress")) { dummyData['Main Address'] = dataObject.mainAddrress.address.join(","); dummyData['Main Address State'] = dataObject.mainAddrress.state; }
    if (dataObject.hasOwnProperty("organisationType")) {
        let OT = dataObject.organisationType
        if (OT.length > 10) {
            OT = OT.slice(0, 10)
        }
        for (let x in OT) {
            dummyData["Org Type " + (parseInt(x) + 1)] = OT[x]
        }
    }
    if (dataObject.hasOwnProperty("contacts")) {
        let CTS = dataObject.contacts
        if (CTS.length > 2) {
            CTS = CTS.slice(0, 2)
        }
        for (let x in CTS) {
            dummyData["Contact " + (parseInt(x) + 1) + " Name"] = CTS[x].name
            dummyData["Contact " + (parseInt(x) + 1) + " eMail"] = CTS[x].email
            dummyData["Contact " + (parseInt(x) + 1) + " Designation"] = CTS[x].designation
            dummyData["Contact " + (parseInt(x) + 1) + " Telephones"] = CTS[x].mobile
        }
    }
    CSVLIST.push(dummyData)
    // console.log(dataObject)
}
// calling the function in a loop to get the data
for (let url of urlList.slice(0, 1000)) {
    var fileName = url.split("=")[1]
    getNGOdata(fileName, url)
}
// console.log(CSVLIST)
var csv = Papa.unparse(CSVLIST);
fs.writeFileSync("CSV/data.csv", csv)