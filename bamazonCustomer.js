//dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
//new stock variable
var newStock = 0;


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

//making the connection connect
connection.connect(function(err) {
    if (err) throw err;
    //run the first function to show the inventory
    showInventory();
  });


  function showInventory(){
  //all of the columns are selected and displayed
    connection.query("SELECT * FROM products", function(err, results){
          console.log(`Id\t|Product\t|Department\t|Price\t|Stock`);
        for(var j = 0; j<results.length; j++){
            console.log(`${results[j].item_id}\t|${results[j].product_name}\t|${results[j].department_name}\t\t|${results[j].price}\t|${results[j].stock_quantity}`);
        }
        if(err) throw err;
         //inquirer prompts start 
        inquirer
          .prompt([
            {
              name: "items",
              type: "input",
              message: "What item would you like to purchase? Choose the item id."
            },
            {
              name: "howMany",
              type: "input",
              message: "How many would you like?"
            }
          ])
          .then(function(answer) {
              var total = 0;
            for (var i = 0; i < results.length; i++) {  
                // console.log("item", results[i].item_id); for debugging purposes
                if(parseInt(answer.items)===parseInt(results[i].item_id)){
                    total = answer.howMany*parseFloat(results[i].price);
                    newStock = parseInt(results[i].stock_quantity)-parseInt(answer.howMany);
                    // console.log("if statement", results[i].price); for debugging purposes
                    // console.log("new Stock", newStock); for debugging purposes
              if(answer.howMany > results[i].stock_quantity){
                console.log(`Insufficient quantity! We only have ${results[i].stock_quantity}`);
                showInventory();
              }
              else{
                  connection.query("UPDATE products SET ? WHERE ?",
                  [
                      {stock_quantity:newStock},
                      {item_id:results[i].item_id}
                  ], function(error){
                      if(err) throw err;                      
                  });
              
              
              console.log("Stock successfully updated.");                            
              console.log(`Your total is $${total}.`);
              showInventory();
                }}}
            });
  });
};