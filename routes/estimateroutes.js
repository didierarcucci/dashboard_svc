'use strict';

module.exports = function(app, pool) {
    console.log("ESTIMATE ROUTES START");

    var estimates = require('../controllers/estimatescontroller')(pool);

    app.route("/recentestimates")
        .get(estimates.list_recent);

    console.log("ROUTE /recentestimates ... OK");
    
    app.route("/estimatedetails/:estimateId")
        .get(estimates.list_details);

    console.log("ROUTE /estimatedetails ... OK");

    app.route("/componentlist/:estimateId")
        .get(estimates.list_components);

    console.log("ROUTE /componentlist   ... OK");

    app.route("/estimaterolelist/:estimateId")
        .get(estimates.list_estimate_roles);

    console.log("ROUTE /estimaterolelist... OK");

    console.log("ESTIMATE ROUTES END");
}