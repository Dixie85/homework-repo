const path = require("path");
const { v4: uuid} = require("uuid");
const dataService = require("../services_utilities/data.services_utilities");
const clientsDataPath = path.join(__dirname, ".." ,"data", "clients.json");


class ClientsModel {
    getAllClientData() {
        return new Promise((resolve,reject)=>{
            const clientsData = dataService.readDataFromDb(clientsDataPath);
            console.log(JSON.parse(clientsData));
            resolve (JSON.parse(clientsData));
        });
    }


}

module.exports = ClientsModel

