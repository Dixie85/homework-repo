const fs = require("fs");

const readData = (path) => {
    const result = JSON.parse(fs.readFileSync(path, {encoding:"utf-8"}));
    return result
};

const writeData = (path, data) => {
    fs.writeFileSync(path,JSON.stringify(data, 0, 2));
};

module.exports = {
    readData,
    writeData
}