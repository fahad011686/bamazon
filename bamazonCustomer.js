require('dotenv').config();
var inquirer = require("inquirer");
var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
});
var userName = "";

function welcome() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter your name."
        }
    ]).then(function (user) {
        console.log("==============================================");
        console.log("Welcome to Bamazon, " + user.name + "!");
        console.log("==============================================");

        userName = user.name;

        bamazon();
    });
}

function bamazon() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Make a selection:",
            choices: ["Purchase", "Sell"]
        }

    ]).then(function (menu) {
        if (menu.choice === "Sell") {
            sellSell();
        }
        else {
            buyBuy();
        }
    });
}

function display() {

    console.log("Here is what we have for sale:\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        // connection.end();
    });
}

function buyBuy() {
    console.log("You have chosen to purchase an item.")
    display();
    inquirer.prompt([
        {
            type: "input",
            message: "Please type the id# of the item you would like:",
            name: "item_id"
        },
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }
    ])
        .then(function (res) {
            if (res.confirm) {
                console.log("\nYou have made a purchase!");

            }
            else {
                console.log("\nOkay " + userName + ", let's try again.");
                bamazon();
            }
        });
}

function sellSell() {
    console.log("You have chosen to sell an item.")
    inquirer.prompt([
        {
            type: "input",
            message: "Please type the name of the item you would like to sell:",
            name: "product_name"
        },
        {
            type: "input",
            message: "Which department should this be listed in?",
            name: "department_name"
        },
        {
            type: "input",
            message: "How much would you like to sell this for?",
            name: "price"
        },
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }
    ])
        .then(function (seller) {
            if (seller.confirm) {
                connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('${seller.product_name}', '${seller.department_name}', ${seller.price}, 1)`,
                    function (err, res) {
                        if (err) throw err;
                        console.log("\nOkay " + userName + ", your product has been successfully listed!");
                        bamazon();
                    });
            }
            else {
                console.log("\nOkay " + userName + ", let's try again.");
                bamazon();
            }
        });
}

welcome();

