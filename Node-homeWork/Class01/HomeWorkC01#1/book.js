const printBookInfo = obj => {
    return Object.entries(obj);
};

const printBookInfo2 = obj => {
    return `Short information about the book Name:${obj.bookName}, Price:${obj.bookPrice}, Autor:${obj.bookAuthor} and Pages:${obj.bookPages}.`;
};

const printBookInfoReduce = obj => {
    return Object.keys(obj).reduce((str,key) => 
        str += `${key}:${obj[key]}, `, "");
};

const myBook = {
    bookName: "Node JS", 
    bookPrice: 50, 
    bookAuthor: "Smartpants Joe", bookReleaseDate: "03-2025", 
    bookPages: 178,
};


module.exports = {
    printBookInfo,
    printBookInfo2,
    printBookInfoReduce,
    myBook,
};