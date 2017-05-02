var appRouter = function(app, pool) {
    var est =  require('../estimates.js');

    app.get("/estimatedetails", function(req, res) {
        var estimateMock = {
            id: 1,
            name: "ESCS Enhancement for Salesforce",
            cost: "6143.75",
            addoncost: "0",
            totalcost: "6143.75",
            effort: "91",
            componentscount: "1",
            createddate: new Date('3/10/2017'),
            hidecontent: true
        }

        if(!req.query.id) {
            return res.send({"status": "error", "message": "missing Estimate ID"});
        } else if(req.query.id != estimateMock.id) {
            return res.send({"status": "error", "message": "wrong ID"});
        } else {
            return res.send(estimateMock);
        }
    });

    app.get("/recentestimatesmock", function(req, res) {
        var estimateArray = [
            {
                name: 'ESCS Enhancement for Salesforce',
                cost: 6143.75,
                addoncost: 0,
                totalcost: 6143.75,
                effort: 91,
                componentscount: 1,
                createddate: new Date('3/10/2017'),
                hidecontent: true
            },
            {
                name: 'Safety Revised',
                cost: 487503.75,
                addoncost: 250000,
                totalcost: 737503.75,
                effort: 5757,
                componentscount: 24,
                createddate: new Date('2/22/2017'),
                hidecontent: true
            },
            {
                name: 'OOGP from DDC',
                cost: 11655,
                addoncost: 0,
                totalcost: 11655,
                effort: 149,
                componentscount: 2,
                createddate: new Date('2/21/2017'),
                hidecontent: true
            },
            {
                name: 'Geo-Tagging',
                cost: 41771.25,
                addoncost: 0,
                totalcost: 41771.25,
                effort: 624,
                componentscount: 5,
                createddate: new Date('2/15/2017'),
                hidecontent: true
            }
        ];

        return res.send(estimateArray);
    });

    app.get("/recentestimates", function(req, res) {
        console.log("get recentestimates");
        var query = "select * from didier.est.ufnGetRecentEstimates()";
        est.executeQuery(pool, query, res);
    });
}
 
module.exports = appRouter;