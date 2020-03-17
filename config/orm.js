// Import MySQL connection.
var connection = require("../config/connection");

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
};

var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    insertOne: function (table, column, values, cb) {
        var queryString = `INSERT INTO ${table} ( ${column.toString()} ) VALUES (?,?)`;

        console.log("insert one : ");
        console.log(queryString);

        connection.query(queryString, values, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    updateOne: function (table, columnValues, condition, cb) {
        var queryString = `UPDATE ${table} SET ${objToSql(columnValues)}  WHERE ${condition}`;

        console.log("UPDATE ONE");
        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        })
    }
};

module.exports = orm;