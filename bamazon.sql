DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Rememberall', 'Charms', 40.15, 50), ('Nimbus 2000', 'Sports', 400, 15),
('Firebolt', 'Sports', 1000, 5), ('Felix Felices', 'Potions', 600, 3), ('Essence of Dittany', 'Potions', 40, 10),
('Polyjuice Potion', 'Potions', 100, 5), ('Owl', 'Pet', 80, 10), ('Cat', 'Pet', 40, 50), ('Snitch', 'Sports', 50, 30), 
('Custom Wand', 'Wands', 150.50, 1);
