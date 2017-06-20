'use strict';

var sql = require('mssql');

module.exports = function(pool) {
    console.log("ESTIMATE CONTROLLER START");

    var thisroute;

    var me = {
        list_recent: function(req, res, next) {
            console.log("START LIST_RECENT");

            console.log("... INIT SQL REQUEST");
            var request = new sql.Request(pool);

            console.log("... EXECUTE SQL QUERY");
            request.query('select top 10 * from didier.est.EstimatesView order by UpdateDate desc').then(result =>  {
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

            console.log("... INPUT PARAM ESTIMATEID => " + req.query.estimateId);
            //request.input('EstimateId', sql.Int, req.query.estimateId);

            console.log("... EXECUTE SQL QUERY");
            request.query('select * from didier.est.EstimatesView where EstimateId = ' + req.query.estimateId).then(result =>  {
                console.log("... FUNCTION SUCCESSFULLY EXECUTED");
                console.log("END LIST_DETAILS");
                return res.send(result.recordset);
            }).catch (err => {
                console.log("... ERROR WHILE QUERYING DATABASE => " + err);
                console.log("END LIST_DETAILS");
                res.status(500).send(err.message);
                return;
            });
        },
        list_components: function(req, res, next) {
            console.log("START LIST_COMPONENTS");

            console.log("... INIT SQL REQUEST");
            var request = new sql.Request(pool);

            console.log("... INPUT PARAM ESTIMATEID => " + req.params.estimateId);
            //request.input('EstimateId', sql.Int, req.params.estimateId);

            console.log("... EXECUTE SQL QUERY");
            request.query('select * from didier.est.ComponentsFlat where ComponentName <> \'Estimate\' and EstimateId = ' + req.params.estimateId).then(result =>  {
                console.log("... FUNCTION SUCCESSFULLY EXECUTED");
                console.log("END LIST_COMPONENTS");
                return res.send(result.recordset);
            }).catch (err => {
                console.log("... ERROR WHILE QUERYING DATABASE => " + err);
                console.log("END LIST_COMPONENTS");
                res.status(500).send(err.message);
                return;
            });
        },
        list_estimate_roles: function(req, res, next) {
            thisroute = "LIST_ESTIMATE_ROLES";
            console.log("START " + thisroute);

            console.log("... INIT SQL REQUEST");
            var request = new sql.Request(pool);

            console.log("... INPUT PARAM ESTIMATEID => " + req.params.estimateId);
            request.input('EstimateId', sql.Int, req.params.estimateId);

            console.log("... EXECUTE SQL QUERY");
            request.execute('didier.est.uspGetEstimateRoleList').then(result =>  {
                console.log("... FUNCTION SUCCESSFULLY EXECUTED");
                console.log("END " + thisroute);
                return res.send(result.recordset);
            }).catch (err => {
                console.log("... ERROR WHILE QUERYING DATABASE => " + err);
                console.log("END " + thisroute);
                res.status(500).send(err.message);
                return;
            });
        },
        component_details: function(req, res, next) {
            thisroute = "COMPONENT_DETAILS";
            console.log("START " + thisroute);

            console.log("... INIT SQL REQUEST");
            var request = new sql.Request(pool);

            console.log("... INPUT PARAM ESTIMATEID => " + req.query.componentId);
            request.input('componentId', sql.Int, req.query.componentId);

            console.log("... EXECUTE SQL QUERY");
            request.execute('didier.est.uspGetComponentById').then(result =>  {
                console.log("... FUNCTION SUCCESSFULLY EXECUTED");
                console.log("END " + thisroute);
                return res.send(result.recordset);
            }).catch (err => {
                console.log("... ERROR WHILE QUERYING DATABASE => " + err);
                console.log("END " + thisroute);
                res.status(500).send(err.message);
                return;
            });
        },
        list_assignments: function(req, res, next) {
            thisroute = "LIST_ASSIGNMENTS";
            console.log("START " + thisroute);

            console.log("... INIT SQL REQUEST");
            var request = new sql.Request(pool);

            console.log("... INPUT PARAM ESTIMATEID => " + req.query.componentId);
            request.input('componentId', sql.Int, req.query.componentId);

            console.log("... EXECUTE SQL QUERY");
            request.execute('didier.est.uspGetAssignmentList').then(result =>  {
                console.log("... FUNCTION SUCCESSFULLY EXECUTED");
                console.log("END " + thisroute);
                return res.send(result.recordset);
            }).catch (err => {
                console.log("... ERROR WHILE QUERYING DATABASE => " + err);
                console.log("END " + thisroute);
                res.status(500).send(err.message);
                return;
            });
        }
    };
    
    console.log("ESTIMATE CONTROLLER END");

    return me;
};