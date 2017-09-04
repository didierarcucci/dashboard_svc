'use strict';

var sql = require('mssql');

module.exports = function(pool) {
    console.log("RESOURCE CONTROLLER START");

    var thisroute;

    var me = {
        list_resources: function(req, res, next) {
            console.log("START LIST_RESOURCES");

            console.log("... INIT SQL REQUEST");
            var request = new sql.Request(pool);

            console.log("... EXECUTE SQL QUERY");
            request.query('select * from didier.dbo.dim_emp').then(result =>  {
                console.log("... QUERY SUCCESSFULLY EXECUTED");
                console.log("END LIST_RESOURCES");
                return res.send(result.recordset);
            }).catch (err => {
                console.log("... ERROR WHILE QUERYING DATABASE => " + err);
                console.log("END LIST_RESOURCES");
                res.status(500).send(err.message);
                return;
            });
        }
    };
    
    console.log("RESOURCE CONTROLLER END");

    return me;
};