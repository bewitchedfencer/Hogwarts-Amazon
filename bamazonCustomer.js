var mysql = require("mysql");
var inquirer = require("inquirer");


// create the connection information for the sql database
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
    //run the first function 
    showInventory();
  });

  function showInventory(){
      connection.query("SELECT * FROM products", function(err, results){
          if(err) throw err;
        console.log("results", results);
          inquirer
          .prompt([
            {
              name: "items",
              type: "rawlist",
              choices: function() {
                var itemArray = [];
                for (var i = 0; i < results.length; i++) {
                  itemArray.push(JSON.stringify(results[i]));
                }
                return itemArray;
              },
              message: "What item would you like to purchase?"
            },
            {
              name: "howMany",
              type: "input",
              message: "How many would you like?"
            }
          ])
          .then(function(answer) {
              var total = 0;
              console.log("answer", answer.items.product_name);
            for (var i = 0; i < results.length; i++) {  
                console.log("item", results[i].price);                
                if(answer.items.item_id ===results[i].item_id){
                    total = answer.howMany*parseFloat(results[i].price);
                    console.log("if statement", results[i].price);
                }             
              if(answer.howMany > results[i].stock_quantity){
                console.log(`Insufficient quantity! We only have ${results[i].stock_quantity}`);
                showInventory();
              }
              else{
                  connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?"
                  [
                      answer.howMany,
                      answer.items.item_id
                  ], function(error){
                      if(err) throw err;                      
                  });
              }
              }
              console.log("Stock successfully updated.");                            
              console.log(`Your total is $${total}`);
            });
  });
};