const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const trainersDataPath = path.join(__dirname, "..", "data", "trainer.json");

const getAllTrainersData = () => {
  const trainers = JSON.parse(
    fs.readFileSync(trainersDataPath, { encoding: "utf-8" })
  );

  return trainers;
};

const saveTrainersData = (data) => {
  fs.writeFileSync(trainersDataPath, JSON.stringify(data, 0, 2));
};

const getTrainersId = (id) => {
  const foundTrainarByID = getAllTrainersData().find((obj) => obj.id === id);
  if (!foundTrainar) throw new Error("No such trainer found");

  return foundTrainar;
};

const updateTrainer = (id, updatedData) => {
  if (updatedData.id) throw new Error("ID cannot be changed!");
  const trainers = getAllTrainersData();
  const trainerIndex = trainers.findIndex((obj) => obj.id === id);
  if (trainerIndex < 0) throw new Error("No such trainer found");

  const updatedTrainerData = {
    ...trainers[trainerIndex],
    ...updatedData,
  };

  trainers[trainerIndex] = updatedTrainerData;

  saveTrainersData(trainers);
  return updatedTrainerData;
};

const addNewTrainer = (newTrainerData) => {
  const trainers = getAllTrainersData();
  const newTrainer = {
    id: uuid(),
    ...newTrainerData,
  };
  const trainersUpdated = [...trainers, newTrainer];
  saveTrainersData(trainersUpdated);
  return newTrainer;
};

const deleteTrainer = (id) => {
  const trainers = getAllTrainersData();
  if (id === "deleteAll") {
    const allTrainersDeleted = [];
    saveTrainersData(allTrainersDeleted);
    return allTrainersDeleted;
  } else {
    const remainTrainers = trainers.filter((obj) => obj.id !== id);
    if (remainTrainers.length === trainers.length)
      throw new Error("No such trainer found");
    saveTrainersData(remainTrainers);
    return remainTrainers;
  }
};

// const deleteAll = () => {
//    const trainers = getAllTrainersData();
//    trainers = [];
// //    saveTrainersData(trainers);
//     return trainers;
// };

module.exports = {
  getAllTrainersData,
  getTrainersId,
  updateTrainer,
  addNewTrainer,
  deleteTrainer,
  //   deleteAll
};
