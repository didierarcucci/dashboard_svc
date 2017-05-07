var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var sql = require('mssql');

var dbConfig = {
    server: "172.21.40.76",
    database: "DIDIER",
    user: "TibcoReadOnly",
    password: "TibcoReadOnly",
    port: 1433
};
var pool = new sql.ConnectionPool(dbConfig);
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./routes/estimateroutes');
routes(app, pool);

pool.connect().then(() => {
    console.log("SUCCESSFULLY CONNECTED TO DATABASE");

    var server = app.listen(3000, function () {
        console.log("LISTENING ON PORT %s...", server.address().port);
    });

}).catch(err => {
        console.log("ERROR WHILE CONNECTING TO DATABASE => " + err);
});