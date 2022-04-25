const router = require("express").Router();
const clientRouter = require("./routes/clientRouter");

router.get("/clients", clientRouter);

module.exports = router;