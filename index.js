const express = require("express"); //importing the express module.
const path = require("path");

const { open } = require("sqlite"); //this is object destructuring
const sqlite3 = require("sqlite3"); // this is the driver.
const app = express();

const dbPath = path.join(__dirname, "goodreads.db");
let db = null;

app.get("/books/", async (request, response) => {
  //http://localhost:3000/books/
  const getBooksQuery = `
    SELECT  
      *
    FROM
      book
    ORDER BY
      book_id;`; //the above is the SQL query for getting books according to the
  //book ids. and we are using backticks for writing a sql query.
  //and we are writing it in a callBack Function.
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});

const initializeDBAndServer = async () => {
  try {
    //here we are handling the errors.
    db = await open({
      //open returns a async promise.which we will handle
      filename: dbPath, //these are all methods
      driver: sqlite3.Database, //this is the driver which is splite3.
    }); //these are the methods which are in documentation
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    }); //if everything is successful then the above console.log will shown in
    //the terminal.
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1); //this will force the nodeJS to exit the process
  }
};

initializeDBAndServer(); //calling the function

//the whole output was a Array of objects,
//in which the various book names are shown.
