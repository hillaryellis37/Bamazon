var mysql = require("mysql");
var inquirer = require("inquirer");

var itemID;
var itemQuantity;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId + "\n");
	readProducts();
});

function readProducts() {
	console.log("Displaying all products...\n");
	connection.query("SELECT * FROM products", function(err, res) {
	    if (err) throw err;
	    for (var i = 0; i < res.length; i++) {
	    	console.log("Item ID:", res[i].id, 
	    				"\nName:", res[i].product_name,
	    				"\nPrice:", "$" + res[i].price,
	    				"\n");
	    }
	    promptItem();
	    connection.end();

	});
}

function promptItem() {
	inquirer
	  .prompt([
	    {
	      type: "input",
	      message: "Please enter item the 'ID' to purchase: ",
	      name: "itemID"
	    },
	   	{
	      type: "input",
	      message: "How many units would you like to purchase?",
	      name: "quantity"
	    }
	  ])
	  .then(function(inquirerResponse) {
	  	// console.log(inquirerResponse.itemID);
	  	// console.log(inquirerResponse.quantity);
	  	itemID = inquirerResponse.itemID;
	  	itemQuantity = inquirerResponse.quantity;

	  	console.log(itemID);
	  	console.log(itemQuantity);


	  });
}