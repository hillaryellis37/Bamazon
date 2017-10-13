var mysql = require("mysql");
var inquirer = require("inquirer");

var itemID;
var quantityReq;
var itemPrice;



var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
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
	    // connection.end();

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

	  	itemID = parseInt(inquirerResponse.itemID);
	  	quantityReq = parseInt(inquirerResponse.quantity);

	  	itemCheck();

	  });
}


function itemCheck() {
	connection.query("SELECT * FROM products WHERE ID=" + itemID, function(err, res) {
	    if (err) throw err;
	    var itemQuantity = res[0].stock_quantity;
	    var itemPrice = res[0].price;
	    var newQuantity = itemQuantity - quantityReq;

	    if (itemQuantity >= quantityReq) {

	    	  var query = connection.query(
			    "UPDATE products SET ? WHERE ?",
			    [
			      {
			        stock_quantity: newQuantity
			      },
			      {
			        id: itemID
			      }
			    ],
			    function(err, res) {

			      
			    }
			  );

			var total = itemPrice * quantityReq;
			console.log("Thanks for shooping at Bamazon, the Bammerest Zon in town! Your total is $" + total);
	    
	    } else {
	    	console.log("This is embarassing! The quantity request exceeds our inventory of", itemQuantity + ".");
	    	promptItem();
	    }



	    // connection.end();
	});
}

