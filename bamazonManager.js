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

connection.connect(function (err) {
    if (err) throw err;
    //run the first function after the connection is made 
    start();
});

function start() {
    inquirer
        .prompt(
            [{
                name: "options",
                type: "list",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product"
                ],
                message: "What would you like to do?"
            }]).then(function (answer) {
            switch (answer.options) {
                case "View Products for Sale":
                    console.log("view the products");
                    productsForSale();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addNewProduct()
                    break;
            }
        });
};

function productsForSale() {
    connection.query("SELECT * FROM products", function (err, results) {
        console.log(`Id\t|Product\t|Department\t|Price\t|Stock`);
        for (var j = 0; j < results.length; j++) {
            console.log(`${results[j].item_id}\t|${results[j].product_name}\t|${results[j].department_name}\t\t|${results[j].price}\t|${results[j].stock_quantity}`);
        }
        if (err) throw err;
    });
    start();
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity <3", function (err, results) {
        console.log(`Id\t|Product\t|Department\t|Price\t|Stock`);
        for (var j = 0; j < results.length; j++) {
            console.log(`${results[j].item_id}\t|${results[j].product_name}\t|${results[j].department_name}\t\t|${results[j].price}\t|${results[j].stock_quantity}`);
        }
        if (err) throw err;
    });
    start();
};

function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        console.log(`Id\t|Product\t|Department\t|Price\t|Stock`);
        for (var j = 0; j < results.length; j++) {
            console.log(`${results[j].item_id}\t|${results[j].product_name}\t|${results[j].department_name}\t\t|${results[j].price}\t|${results[j].stock_quantity}`);
        }
        if (err) throw err;
        //inquirer prompts start 
        inquirer
            .prompt([{
                    name: "items",
                    type: "input",
                    message: "What item would you like to update? Choose the id."
                },
                {
                    name: "howMany",
                    type: "input",
                    message: "How many would you like to add?"
                }
            ])
            .then(function (answer) {
                for (var i = 0; i < results.length; i++) {
                    // console.log("item", results[i].item_id); for debugging purposes
                    if (parseInt(answer.items) === parseInt(results[i].item_id)) {
                        newStock = parseInt(results[i].stock_quantity) + parseInt(answer.howMany);
                        // console.log("new Stock", newStock); for debugging purposes
                        connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newStock
                            },
                            {
                                item_id: results[i].item_id
                            }
                        ], function (error) {
                            if (err) throw err;
                        });


                        console.log("Stock successfully updated.");
                        connection.end();
                    }
                }
            });
    });

};

function addNewProduct() {
    inquirer
        .prompt([{
                name: "productName",
                type: "input",
                message: "What is the name of the new product?"
            },
            {
                name: "departmentName",
                type: "input",
                message: "In which department does it belong?"
            },
            {
                name: "price",
                type: "input",
                message: "How much does it cost?"
            },
            {
                name: "stock",
                type: "input",
                message: "How much is in stock?"
            }
        ]).then(function (answers) {
            connection.query("INSERT INTO products SET ?", {
                    product_name: answers.productName,
                    department_name: answers.departmentName,
                    price: answers.price,
                    stock_quantity: answers.stock
            }, function (err) {
                if (err) throw err;
            });
            connection.end();
        });

};