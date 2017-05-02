var sql = require('mssql');

var enhancementsquery = 'SELECT * FROM ELINK_Reporting.[dbo].[extractServiceDeskRequests](\'R\')';

module.exports = function(pool) {
    console.log("Route enhancements - OK");

    var me = {
        get: function(req, res, next) {
            console.log("init sql request object");
            var request = new sql.Request(pool);

            console.log("execute sql query");
            request.query(enhancementsquery).then(result =>  {
                console.log("query executed");
                return res.send(result.recordset);
            }).catch (err => {
                console.log("error while querying database - " + err);
                res.status(500).send(err.message);
                return;
            });
        }
    };
    
    return me;
};