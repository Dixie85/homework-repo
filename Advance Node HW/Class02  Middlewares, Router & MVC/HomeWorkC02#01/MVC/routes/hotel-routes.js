const router = require("express").Router();

// *** IMPLEMENTING MVC ****

const HotelsController = require("../controller/hotels-controller");
const hotelsController = new HotelsController();

router.get("/", (req, res) => {
  console.log( "1. HOTELS route calling the controller =)");
  const hotels = hotelsController.getHotels();
  res.send(hotels);
});

router.post("/add_hotel", (req, res)=> {
  console.log("add_hotel calling the controller ;)");
  const hotelData = req.body;
  hotelsController.addHotel(hotelData);
  res.send({message:"Hotel was added"});
});

module.exports = router;
