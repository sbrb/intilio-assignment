
////  Q6 : How to find if a string is present in a text file ?
const fs = require('fs');
const findStringInFile = (filePath, searchString) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log("File reading error", err)
            return
        }
        if (data.includes(searchString)) {
            console.log(searchString)
        } else {
            console.log("String not found")
        }
    })
}

findStringInFile('z.txt', 'HTMLa')