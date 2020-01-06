var connection = require("./connection.js");
require('dotenv').config();
var inquirer = require("inquirer");
var mysql = require("mysql");
const { table } = require('table');

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

let output;

function makeArray(arrayOfObjs) {
    let titles = Object.keys(arrayOfObjs[0]);
    return [
        titles,
        ...arrayOfObjs.map(function (a) { return Object.values(a); })
    ];
}

function display() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
    // connection.end();
    output = makeArray(res);
    console.log(output);
    console.log("Please type the id# of the item you would like:\n");
});
}



function buyBuy() {
    console.log("You have chosen to purchase an item.")
    display();
    inquirer.prompt([
        {
            type: "input",
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
                //check if product is in stock
                function check() {
                    connection.query("SELECT stock_quantity FROM products WHERE item_id=" + res.item_id,
                        function (err, response) {
                            if (err) throw err;
                            if (response[0].stock_quantity < 1) {
                                console.log("We are out of stock!");
                                bamazon();
                            }
                            else {
                                console.log("Thank you for your purchase!");
                                updatedQ = response[0].stock_quantity - 1;
                                console.log(updatedQ + " remaining.");

                                connection.query(
                                    "UPDATE products SET ? WHERE ?",
                                    [
                                        {
                                            stock_quantity: updatedQ
                                        },
                                        {
                                            item_id: res.item_id
                                        }
                                    ],
                                    function (error) {
                                        if (error) throw err;

                                    }
                                );

                                bamazon();
                            }
                        });

                };
                check();

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

