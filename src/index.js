const express = require('express')
const app = express()
const _ = require("lodash");
const balance = require("./crypto-balance");
const mysql = require('mysql');

let db_connection;
const db_table = process.env.DB_TABLE;
if (process.env.DB_HOST) {
    db_connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
    });

    console.log("Connecting to db...")

    // Check if the table exists and create if it doesn't
    db_connection.query(`SELECT 1 FROM ${db_table} LIMIT 1`, function (error, results, fields) {
        if (error && error.code === "ER_NO_SUCH_TABLE") {
            console.log("Table doesn't exist...creating")
            db_connection.query(`CREATE TABLE ${db_table} (id int NOT NULL AUTO_INCREMENT, address VARCHAR(50) NOT NULL, asset VARCHAR(5) NOT NULL, quantity DECIMAL(25, 10), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));`);
        } else if (error) {
            console.log("Invalid database connection...");
            db_connection = undefined;
        }
    });
}

function get_balances(req, res) {
    const addr = req.params.addr;
    return balance(addr)
    .then(function(items) {
        if (db_connection) {
            // Add all the new balances to the database
            items.forEach(item => {
                db_connection.query(`INSERT INTO ${db_table} (address, asset, quantity) VALUES ('${addr}', '${item.asset}', ${item.quantity})`);
            });
            // Find last updated assets
            db_connection.query(`SELECT asset from ${db_table} join (SELECT max(id) as id FROM ${db_table} where address = '${addr}' GROUP BY asset DESC) as inn on inn.id = ${db_table}.id WHERE quantity != 0`, function (error, results, fields) {
                // Get all assets that previously had a balance but no longer and insert a 0 balance
                const zeroBalances = _.difference(results.map(res => res.asset), items.map(item => item.asset));
                zeroBalances.forEach(asset => {
                    db_connection.query(`INSERT INTO ${db_table} (address, asset, quantity) VALUES ('${addr}', '${asset}', 0)`);
                });
            });
        }
        res.send(items);
    }).catch(function(error) {
        res.send(error);
    });
}

app.get('/:addr', function (req, res) {
    if (!db_connection) {
        return get_balances(req, res);
    }
    db_connection.query(`SELECT asset, quantity FROM ${db_table} where address = '${req.params.addr}' AND created_at > (NOW() - INTERVAL ${process.env.CACHE_HOURS} HOUR)`, function (error, results, fields) {
        // If no cached results within the specified CACHE_HOURS environment variable, refresh balances
        if (error || results.length === 0) {
            return get_balances(req, res);
        }
        res.send(results.filter(result => result.quantity != 0));
    });
});

app.get('/refresh/:addr', function (req, res) {
    get_balances(req, res);
});

app.listen(8888, function () {
    console.log('App listening on port 8888!')
});