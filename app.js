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

var recentestimates = require('./routes/recentestimates')(pool);
var enhancements = require('./routes/enhancements')(pool);
var estimatedetails = require ('./routes/estimatedetails')(pool);

app.get("/recentestimates", recentestimates.get);
app.get("/enhancements", enhancements.get);
app.get("/estimatedetails", estimatedetails.get);

pool.connect().then(() => {
    console.log("successfully connected database");

    var server = app.listen(3000, function () {
        console.log("Listening on port %s...", server.address().port);
    });

}).catch(err => {
        console.log("error while connecting database - " + err);
});