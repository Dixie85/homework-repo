const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");


// Sync
const theSyncHomeWorkDoc = path.join(__dirname, "Sync", "homework.txt");
fs.writeFileSync(theSyncHomeWorkDoc, '"Homework 02 in Basic Node"');
fs.appendFileSync(theSyncHomeWorkDoc, ' " FINISHED!"' );
fs.appendFileSync(theSyncHomeWorkDoc,  "\n The Sync-method is used to create this file ;)" );
const readData = fs.readFileSync(theSyncHomeWorkDoc, {encoding:"utf-8"});
console.log(readData);

// Async
// use callbacks to return data
const theAsyncHomeWorkDoc = path.join(__dirname, "Async", "homework.txt");
fs.writeFile(theAsyncHomeWorkDoc, '"Homework 02 in Basic Node"', (err) => {
    if(err) throw new Error("Something went wrong Writin!")
});
fs.appendFile(theAsyncHomeWorkDoc, ' " FINISHED!" \n Got to be careful with Async-method :)', () => console.log("Appended!"));
fs.readFile(theAsyncHomeWorkDoc, {encoding:"utf-8"}, (err,data) => {
    if(err) throw new Error ("Something went wrong Reading!");
    console.log(data)
});

// Async-Promise
const  theAsyncPromiseHomeWorkDoc = path.join(__dirname, "Promise", "homework.txt");
const writeHoWo =  async () => {
await fsPromises.writeFile(theAsyncPromiseHomeWorkDoc, '"Homework 02 in Basic Node"',);
await fsPromises.appendFile(theAsyncPromiseHomeWorkDoc, ' " FINISHED!"' );
await fsPromises.appendFile(theAsyncPromiseHomeWorkDoc, "\n You guess right Promises =)" );
const readData = await fsPromises.readFile(theAsyncPromiseHomeWorkDoc, {encoding:"utf-8"});
console.log(readData);
};
writeHoWo();