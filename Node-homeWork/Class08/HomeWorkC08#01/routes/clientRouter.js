const router = require("express").Router();
const ClientsController = require("../controller/clientController");
const clientController = new ClientsController();

router.get("/", async (req,res) => {
try {
    console.log("clientRouter fieres");
    const clientsData = await clientController.fetchAllClients();
    res.status(200).send(clientsData)
} catch (error) {
    res.status(400).send(error)
}    
});

module.exports = router;