DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Play Station 4", "Electronics", 325.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("One Teaspon Bandit Shorts", "Women's Clothing", 110.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bleach", "Cleaning Supplies", 2.59, 352);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coconut Le Croix 12 pack", "Food and Beverage", 3.99, 58);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toilet Paper", "Household Amenities", 7.59, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Racer 5 Micro Beer", "Food and Beverage", 11.99, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lovers + Friends Tie up Blouse", "Women's Clothing", 158.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dish Soap", "Cleaning Supplies", 4.00, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Marc Fisher Platform Sandals", "Women's Clothing", 178.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone 5s charger", "Electronics", 11.00, 112);
