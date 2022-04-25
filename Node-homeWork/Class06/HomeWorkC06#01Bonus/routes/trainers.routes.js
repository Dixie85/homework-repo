const router = require("express").Router();
const trainersUtillities = require("./../utilities/trainers.utilities");

// 1. Get all trainers.
router.get("/trainers", (req, res) => {
  const queryData = req.query;
  console.log(queryData);
  try {
    const trainers = trainersUtillities.getAllTrainersData(queryData);
    res.send(trainers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// 2. Get trainer by id.
router.get("/trainers/:id", (req, res) => {
  const trainersId = req.params.id;
  try {
    const foundTrainar = trainersUtillities.getTrainersId(trainersId);
    res.status(200).send(foundTrainar);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
// 3. Update Trainer Info.
router.patch("/trainers/:id/update", (req, res) => {
  const updatesData = req.body;
  const trainerId = req.params.id;
  try {
    const upratedTrainer = trainersUtillities.updateTrainer(
      trainerId,
      updatesData
    );
    res.status(200).send(upratedTrainer);
  } catch (error) {
    if (error.message === "ID cannot be changed!") {
      res.status(400).send(error.message);
    } else if (error.message === "No such trainer found") {
      res.status(404).send(error.message);
    } else {
      res.status(500);
    }
  }
});
// 4. Add a trainer.
router.post("/trainers/add", (req,res)=> {
    const newTrainerData = req.body;
    try {
        const addedNewTrainer = trainersUtillities.addNewTrainer(newTrainerData);
        res.status(200).send(addedNewTrainer);
    } catch (error) {
        res.status(500);
    }
});
// 5. Delete trainer.   //6. Delete all trainers.
router.delete("/trainers/:id", (req,res)=>{
    const trainerId = req.params.id;
    try {
        const trainersDelete = trainersUtillities.deleteTrainer(trainerId);
        console.log(trainersDelete);
        res.status(200).send(trainersDelete);
    } catch (error) {
        if(error.message === "No such trainer found"){
            res.status(404).send(error.messasge);
        }else{
            res.status(500);
        };        
    }
});
// 6. Delete all trainers.
// router.get("/trainers/delete", (req,res) => {
//     const deleteAllData = trainersUtillities.deleteAll();
//     try {
//         res.status(200).send(deleteAllData);
//     } catch (error) {
//         res.status(500);
        
//     }
// });



module.exports = router;
