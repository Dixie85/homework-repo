const { readFile, writeFile } = require("../utils/file-service");
const path = require("path");
const MOTEL_PATH = path.join(__dirname, "..","db","motels.json");

class MotelModel {
  getMotels() {
    console.log("3.Motels from Model");
    // const motelJsonData = readFile(MOTEL_PATH);
    // return motelJsonData
    return readFile(MOTEL_PATH)
  }

  addMotel(data) {
    console.log("Motel about to be added");
    const motelsDataJson = readFile(MOTEL_PATH);
    const addedData = [...motelsDataJson, data];
    writeFile(MOTEL_PATH, addedData);
    console.log("Motel has been added");
  }

}

module.exports = MotelModel;