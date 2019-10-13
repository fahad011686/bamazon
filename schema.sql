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

-- sample products
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Coca Cola', 'Drinks', 2, 10);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Nuka Cola', 'Drinks', 10, 10);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Snickers', 'Candy', 1, 10);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Peanut M&Ms', 'Candy', 1, 10);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Twizzlers', 'Candy', 2, 5);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Steak', 'Deli', 9, 3);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Turkey Slices', 'Deli', 3, 10);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Buffalo Wings', 'Deli', 10, 5);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Remington Model 870 Wingmaster', 'Guns', 200, 2);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Audi S3', 'Cars', 43000, 1);
-- INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('BMW M8', 'Cars', 133000, 1);

SELECT * FROM products;