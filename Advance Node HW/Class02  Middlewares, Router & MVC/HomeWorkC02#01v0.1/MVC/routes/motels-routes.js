const MotelController = require("../controller/motels-controller");
const motelController = new MotelController;
const router = require("express").Router();

router.get("/", (req,res) => {
  console.log("1.Router calling Controller");
  res.status(200).send(motelController.getMotels());
  
});

router.post("/add_motel",(req,res)=>{
  console.log("Router sending data to Controller")
  const motelData = req.body;
  motelController.addMotel(motelData);
  res.status(200).send({message:"movie is added"})
});

module.exports = router;
