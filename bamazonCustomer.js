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
	});
}

function promptItem() {
	inquirer
	  .prompt([
	    {
	      type: "input",
	      message: "Please enter the item 'ID' to make a purchase: ",
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
			console.log("\nThanks for shooping at Bamazon, the Bammerest Zon in town! Your total is $" + total.toFixed(2) + "\n\n");
		    inquirer
			  .prompt([
			    {
			      type: "list",
			      message: "Would you like to purchase another item?\n",
			      choices: ["Yes", "No, please exit me from the Bamazon"],
			      name: "again"
			    }
	
			  ])
			  .then(function(inquirerResponse) {

				if (inquirerResponse.again === "Yes") {
					promptItem();
				}

	  });
	    } else {
	    	console.log("\nThis is embarassing! The quantity request exceeds our inventory of", itemQuantity + ".\n");
	    	promptItem(); 
	    }



	    // connection.end();
	});
}

