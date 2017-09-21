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
            request.query('select EmpId, EmpName, Dept, Team, Organization, EmpType, RecordType, Role, TechStack, CBRate, ActRate, StartDateActive, EndDateActive, Location, CapRatio, Budgeted, LoadHoursFlag, Active from didier.dbo.dim_emp order by active desc, empname').then(result =>  {
                console.log("... QUERY SUCCESSFULLY EXECUTED");
                console.log("END LIST_RESOURCES");
                return res.send(result.recordset);
            }).catch (err => {
                console.log("... ERROR WHILE QUERYING DATABASE => " + err);
                console.log("END LIST_RESOURCES");
                res.status(500).send(err.message);
                return;
            });
        },
        resource_details: function(req, res, next) {
            console.log("START RESOURCE_DETAILS");

            console.log("... INIT SQL REQUEST");
            var request = new sql.Request(pool);

            console.log("... INPUT PARAM RESOURCEID => " + req.query.resourceId);

            console.log("... EXECUTE SQL QUERY");
            request.query('select EmpId, EmpName, Dept, Team, Organization, EmpType, RecordType, Role, TechStack, CBRate, ActRate, StartDateActive, EndDateActive, Location, CapRatio, Budgeted, LoadHoursFlag, Active from didier.dbo.dim_emp where EmpId = ' + req.query.resourceId).then(result =>  {
                console.log("... QUERY SUCCESSFULLY EXECUTED");
                console.log("END RESOURCE_DETAILS");
                return res.send(result.recordset);
            }).catch (err => {
                console.log("... ERROR WHILE QUERYING DATABASE => " + err);
                console.log("END RESOURCE_DETAILS");
                res.status(500).send(err.message);
                return;
            });
        }
    };
    
    console.log("RESOURCE CONTROLLER END");

    return me;
};