# **Hogwarts-Amazon**
------------------------------------------
This project uses Node.js and MySQL to create a database and modify that database in the terminal. The database houses items relating to Harry Potter. 

## **Getting Started**
------------------------------------------
1. Copy the repo to your local computer. 
2. Run the bamazon.sql code in a MySQL GUI like MySQL Pro or MySQL Workbench.
3. Install the dependencies with `npm install`. You must have already installed Node.js to your computer.
4. Run the file with node [filename]. There are three files to choose from: 
  A. bamazonCustomer.js
  B. bamazonManager.js
  C. bamazonSupervisor.js
  
### **bamazonCustomer.js
------------------------------------------
Start by running the customer file with Node.js.

![Running the Customer File](/bamazonPIcs/runTheFile.png)

A table will appear showing the inventory for the store. The user will be asked for the id of the product they desire.

![First Table](/bamazonPIcs/initialTable.png)

The user will be asked for the quantity of the item they want. If an amount more than the quantity in stock is chosen, the user will be shown a message. Then the user will be asked what item they want to purchase again.

![Insufficient Quantity](insufficientQuantity.png)

If the user puts in a quantity that is in stock, as pictured below, 

![Sufficient Quantity](sufficientQuantity.png)

then the stock amount will be updated and the total price will be shown. Then program will run again automatically, so that the user will hopefully buy more!

![Purchase made](PurchaseMade.png)

## **Built With**
------------------------------------------
[Visual Studio Code](https://code.visualstudio.com/)

[Inquirer](https://www.npmjs.com/package/inquirer)

[MySQL NPM](https://www.npmjs.com/package/mysql)

[Node.js](https://nodejs.org/en/download/)

[MySQL Workbench](https://www.mysql.com/products/workbench/)

### **Contributing**
-----------------------------
If you would like to contribute to this repository, please contact the author or fork this repository to make your own changes.

### **Author**
-----------------------------
This application was created by Alexa Robinson.

### **License**
-----------------------------
This is a public domain application.

### **Acknowledgements**
-----------------------------
Thank you to the academic support at UCF Coding Bootcamp for teaching me the skills to build this application.