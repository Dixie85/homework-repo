const ClientsModel = require("../models/clientModel");
const clientsModel = new ClientsModel();

class ClientsController {
    fetchAllClients() {
        return clientsModel.getAllClientData()
    }
};

module.exports = ClientsController;