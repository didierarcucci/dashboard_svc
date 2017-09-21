'use strict';

module.exports = function(app, pool) {
    console.log("ROUTES START");

    var estimates = require('../controllers/estimatescontroller')(pool);
    var dashboard = require('../controllers/dashboardcontroller')(pool);
    var resources = require('../controllers/resourcescontroller')(pool);

    console.log("LOADING ESTIMATE ROUTES START");

    app.route("/recentestimates")
        .get(estimates.list_recent);
    console.log("ROUTE /recentestimates  ... OK");
    
    app.route("/estimatedetails")
        .get(estimates.list_details);
    console.log("ROUTE /estimatedetails  ... OK");

    app.route("/componentlist/:estimateId")
        .get(estimates.list_components);
    console.log("ROUTE /componentlist    ... OK");

    app.route("/estimaterolelist/:estimateId")
        .get(estimates.list_estimate_roles);
    console.log("ROUTE /estimaterolelist ... OK");

    app.route("/componentdetails")
        .get(estimates.component_details);
    console.log("ROUTE /componentdetails ... OK");

    app.route("/assignmentlist")
        .get(estimates.list_assignments);
    console.log("ROUTE /assignmentlist   ... OK");

    console.log("LOADING ESTIMATE ROUTES END");

    console.log("LOADING DASHBOARD ROUTES START");

    app.route("/dashboardkpi")
        .get(dashboard.kpi);
    console.log("ROUTE /dashboardkpi     ... OK");

    console.log("LOADING DASHBOARD ROUTES END");

    console.log("LOADING RESOURCES ROUTES START");

    app.route("/resources")
        .get(resources.list_resources);
    console.log("ROUTE /resources        ... OK");
    
    app.route("/resourcedetails")
        .get(resources.resource_details);
    console.log("ROUTE /resourcesdetails ... OK");

    console.log("LOADING RESOURCES ROUTES END");

    console.log("ROUTES END");
}