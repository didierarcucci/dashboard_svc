'use strict';

module.exports = function(app, pool) {
    console.log("ESTIMATE ROUTES START");

    var estimates = require('../controllers/estimatescontroller')(pool);

    app.route("/recentestimates")
        .get(estimates.list_recent);
    console.log("ROUTE /recentestimates ... OK");
    
    app.route("/estimatedetails")
        .get(estimates.list_details);
    console.log("ROUTE /estimatedetails ... OK");

    app.route("/componentlist/:estimateId")
        .get(estimates.list_components);
    console.log("ROUTE /componentlist   ... OK");

    app.route("/estimaterolelist/:estimateId")
        .get(estimates.list_estimate_roles);
    console.log("ROUTE /estimaterolelist... OK");

    app.route("/componentdetails")
        .get(estimates.component_details);
    console.log("ROUTE /componentdetails ... OK");

    app.route("/assignmentlist")
        .get(estimates.list_assignments);
    console.log("ROUTE /assignmentlist   ... OK");

    console.log("ESTIMATE ROUTES END");
}