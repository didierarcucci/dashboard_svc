'use strict';

module.exports = function(app, pool) {
    var estimates = require('../controllers/estimatescontroller')(pool);

    console.log("ESTIMATES - ROUTES - START");

    app.route("/recentestimates")
        .get(estimates.list_recent);

    console.log("... ROUTE /recentestimates ... OK");
    
    app.route("/estimatedetails/:estimateId")
        .get(estimates.list_details);

    console.log("... ROUTE /estimatedetails ... OK");

    console.log("ESTIMATES - ROUTES - END");
}