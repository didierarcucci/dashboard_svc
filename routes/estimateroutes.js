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

    app.route("/componentlist/:estimateId")
        .get(estimates.list_components);

    console.log("... ROUTE /componentlist   ... OK");

    app.route("/estimaterolelist/:estimateId")
        .get(estimates.list_estimate_roles);

    console.log("... ROUTE /estimaterolelist   ... OK");

    console.log("ESTIMATES - ROUTES - END");
}