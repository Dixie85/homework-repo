const MotelModel = require("../models/motels-model");
const motelModel = new MotelModel;

class MotelController {
    getMotels() {
      console.log("2.Controller on duty!");
      return motelModel.getMotels();
    }

    addMotel(data) {
      console.log("Controller passing info!");
      motelModel.addMotel(data);
    }
}

module.exports = MotelController;