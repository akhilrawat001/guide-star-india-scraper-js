const fs = require('fs'); 

// creating a function to read files
const readJsonFile = (fileName) => {
    let contents = fs.readFileSync(fileName);
    return JSON.parse(contents);
};
// creating a function to write json files
const writeJsonFile = (fileName,data) => {
    let json = JSON.stringify(data, null, 2);    
    fs.writeFileSync(fileName, json);
};
module.exports  = { 
    readJsonFile : readJsonFile,
    writeJsonFile : writeJsonFile
};