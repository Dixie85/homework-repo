const {printBookInfo,printBookInfo2, printBookInfoReduce, myBook} = require("./book")

const myBook2 = {
    Name: "Node JS", 
    Price: 50, 
    Author: "Smartpants Joe", bookReleaseDate: "03-2025", 
    Pages: 178,
};

const printBook = printBookInfo(myBook);
console.log(printBook);

const printBook2 = printBookInfo2(myBook);
console.log(printBook2);

const printBookReduc = printBookInfoReduce(myBook2);
console.log(printBookReduc);
