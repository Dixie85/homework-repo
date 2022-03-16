const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");



const tasksHoWoPath = path.join(__dirname, "dataHoWo", "tasksHoWo.json");

// Some Extra code for the HomeWork
const jsonText = [];
fs.writeFileSync(tasksHoWoPath, JSON.stringify(jsonText));

//Gettings all tasks
const getAllTasks = () => {
  const tasksData = fs.readFileSync(tasksHoWoPath, { encoding: "utf-8" });
  return JSON.parse(tasksData);
};

//Save all tasks
const saveTasks = tasks => {
  fs.writeFileSync(tasksHoWoPath, JSON.stringify(tasks, null, 2));
};

//Creating a new task
const createTask = (taskText, ownerName)  => {
  const tasks = getAllTasks();
  const newTask = {
    id: uuid(),
    task: taskText,
    isFinished: false,
    owner: ownerName,
  };
  tasks.push(newTask);
  saveTasks(tasks);
};

//Finish task
const finishTask = taskId => {
  const tasks = getAllTasks();
  const task = tasks.find(task => task.id === taskId);

  if (!task) throw new Error("Task doesn't exist");

  task.isFinished = true;

  saveTasks(tasks);
};

//TODO Delete a task (10 min student exercise)
const removeTask = taskId => {
  const tasks = getAllTasks();

  const updatedTasks = tasks.filter(task => task.id !== taskId);

  if (tasks.length === updatedTasks.length) throw new Error("Task not found");

  saveTasks(updatedTasks);
};

const finishAllTasks = tasks => {
  tasks.forEach(task => (task.isFinished = true));
  saveTasks(tasks);
};



//HomeWork edition
// Bonus 01
const editTask = (findTask, changeTask) => {
    const tasks = getAllTasks();
    const theTask = tasks.find(task => task.task === findTask);
    theTask.task = changeTask; 
    saveTasks(tasks);
    console.log(theTask);
};
// editTask("Ask questions", "Wash CAr")

// Bonus 02
const  getTasksByOwner = (owner) => {
    const tasks = getAllTasks();
    const ownerTask = tasks.filter(task => task.owner === owner);
    if(ownerTask.length === 0) throw new Error ("No such person");
    saveTasks(ownerTask);
    console.log(ownerTask);
};
// getTasksByOwner("Olive Yew")

// Bonus 03
const deliteAll = () => {
    const jsonText = [];
    fs.writeFileSync(tasksHoWoPath, JSON.stringify(jsonText));
};


module.exports = {
  getAllTasks,
  saveTasks,
  createTask,
  finishTask,
  removeTask,
  finishAllTasks,
  editTask,
  getTasksByOwner,
  deliteAll,
};

console.log("changed");
