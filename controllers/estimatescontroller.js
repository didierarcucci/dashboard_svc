'use strict';

var sql = require('mssql');

module.exports = function(pool) {
    console.log("CONTROLLER ESTIMATE - OK");

    var me = {
        list_recent: function(req, res, next) {
            console.log("START LIST_RECENT");

            console.log("... INIT SQL REQUEST");
            var request = new sql.Request(pool);

            console.log("... EXECUTE SQL QUERY");
            request.query('select * from didier.est.ufnGetRecentEstimates(10)').then(result =>  {
                console.log("... QUERY SUCCESSFULLY EXECUTED");
                console.log("END LIST_RECENT");
                return res.send(result.recordset);
            }).catch (err => {
                console.log("... ERROR WHILE QUERYING DATABASE => " + err);
                console.log("END LIST_RECENT");
                res.status(500).send(err.message);
                return;
            });
        },
        list_details: function(req, res, next) {
            console.log("START ESTIMATE_DETAILS");

            console.log("... INIT SQL REQUEST");
            var request = new sql.Request(pool);

            console.log("... INPUT PARAM ESTIMATEID => " + req.params.estimateId);
            request.input('EstimateId', sql.Int, req.params.estimateId);

            console.log("... EXECUTE SQL QUERY");
            request.execute('didier.est.uspGetEstimateById').then(result =>  {
                console.log("... FUNCTION SUCCESSFULLY EXECUTED");
                console.log("END LIST_RECENT");
                return res.send(result.recordset);
            }).catch (err => {
                console.log("... ERROR WHILE QUERYING DATABASE => " + err);
                console.log("END LIST_RECENT");
                res.status(500).send(err.message);
                return;
            });
        }
    };
    
    return me;
};