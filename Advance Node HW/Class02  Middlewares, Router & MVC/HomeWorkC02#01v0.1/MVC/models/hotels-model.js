const path = require("path");

const { readFile, writeFile } = require("../utils/file-service");

const HOTELS_PATH = path.join(__dirname, "..", "db", "hotel.json");

class HotelsModel {
  getHotels() {
    console.log("3. Model, heavy lifting and we will return the data back");
    console.log("data will return to the user, and we return data INSTEAD OF VIEW");
    const hotels = readFile(HOTELS_PATH);
    return hotels;
  }

  addHotels(data) {
    console.log("I do more heavy lifting xo");
    const hotelJsonData = readFile(HOTELS_PATH);
    const addedHotelData = [...hotelJsonData, data];
    writeFile(HOTELS_PATH, addedHotelData);

    console.log("Hotel was added!");
  }

}

module.exports = HotelsModel;

