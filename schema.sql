DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;
CREATE TABLE products(
   item_id INT (3) AUTO_INCREMENT NOT NULL,
   product_name VARCHAR(30) NULL,
   department_name VARCHAR(30) NULL,
   price INT(3) NULL,
   stock_quantity INT(9) NULL,
   
 PRIMARY KEY (item_id)
);

SELECT * FROM products;