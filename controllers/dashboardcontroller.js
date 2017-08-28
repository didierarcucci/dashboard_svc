'use strict';

var sql = require('mssql');

module.exports = function(pool) {
    console.log("DASHBOARD CONTROLLER START");

    var thisroute;

    var me = {
        kpi: function(req, res, next) {
            console.log("START KPI");

            console.log("... INIT SQL REQUEST");
            var request = new sql.Request(pool);

            console.log("... EXECUTE SQL QUERY");
            request.query('\
                SELECT	[PrjHrsCurYr],\
                        [PrjHrsPreYr],\
                        [CapCurYr],\
                        [CapBud],\
                        [ResMixCurYr],\
                        [ResMixPreYr],\
                        [CBRateCurYr],\
                        [CBRatePreYr]\
                FROM	(	SELECT	\'PrjHrsCurYr\' kpi, ROUND(SUM(TSHours),0) value\
                            FROM	DIDIER.dbo.STG_ACTUALS\
                            WHERE	PayClass = \'Project\'\
                            AND		Active <> \'N\'\
                            AND		YEAR(TSDay) = YEAR(GETDATE())\
                            UNION\
                            SELECT	\'PrjHrsPreYr\' kpi, ROUND(SUM(TSHours),0) value\
                            FROM	DIDIER.dbo.STG_ACTUALS\
                            WHERE	PayClass = \'Project\'\
                            AND		Active <> \'N\'\
                            AND		YEAR(TSDay) = YEAR(GETDATE()) - 1\
                            AND		DATEPART(WEEK, TSDay) <= (SELECT DATEPART(WEEK, MAX(TSDay)) FROM DIDIER.dbo.STG_ACTUALS)\
                            UNION\
                            SELECT	\'CapCurYr\' kpi, SUM(CapAmount) value\
                            FROM	DIDIER.dbo.V_CAP_ACTUALS_DAY\
                            WHERE	YEAR("Day") = YEAR(GETDATE())\
                            UNION\
                            SELECT	\'CapBud\' kpi, SUM(CapAmount) value\
                            FROM	DIDIER.dbo.V_CAP_BUDGET_DAY\
                            WHERE	YEAR(BudDay) = YEAR(GETDATE())\
                            AND		BudDay <= (SELECT MAX(TSDay) FROM DIDIER.dbo.STG_ACTUALS)\
                            UNION\
                            SELECT	\'ResMixCurYr\' kpi, Percentage value\
                            FROM	(	SELECT	Location, 100 * COUNT(*) / SUM(COUNT(*)) OVER () Percentage\
                                        FROM	DIDIER.dbo.DIM_EMP\
                                        WHERE	StartDateActive <= (SELECT MAX(TSDay) FROM DIDIER.dbo.STG_ACTUALS)\
                                        AND		ISNULL(EndDateActive, \'2099-12-31\') >= (SELECT MAX(TSDay) FROM DIDIER.dbo.STG_ACTUALS)\
                                        AND		RecordType = \'Person\'\
                                        GROUP BY\
                                                Location\
                                    ) t\
                            WHERE	t.Location = \'Onsite\'\
                            UNION\
                            SELECT	\'ResMixPreYr\' kpi, Percentage value\
                            FROM	(	SELECT	Location, 100 * COUNT(*) / SUM(COUNT(*)) OVER () Percentage\
                                        FROM	DIDIER.dbo.DIM_EMP\
                                        WHERE	StartDateActive <= (SELECT DATEADD(YEAR, -1, MAX(TSDay)) FROM DIDIER.dbo.STG_ACTUALS)\
                                        AND		ISNULL(EndDateActive, \'2099-12-31\') >= (SELECT DATEADD(YEAR, -1, MAX(TSDay)) FROM DIDIER.dbo.STG_ACTUALS)\
                                        AND		RecordType = \'Person\'\
                                        GROUP BY\
                                                Location\
                                    ) t\
                            WHERE	t.Location = \'Onsite\'\
                            UNION\
                            SELECT	\'CBRateCurYr\' kpi, 0 value\
                            UNION\
                            SELECT	\'CBRatePreYr\' kpi, 0 value\
                        ) t\
                PIVOT	(	MAX(value)\
                            FOR kpi IN ([PrjHrsCurYr], [PrjHrsPreYr], [CapCurYr], [CapBud], [ResMixCurYr], [ResMixPreYr], [CBRateCurYr], [CBRatePreYr])\
                        ) p\
            ').then(result =>  {
                console.log("... QUERY SUCCESSFULLY EXECUTED");
                console.log("END KPI");
                return res.send(result.recordset);
            }).catch (err => {
                console.log("... ERROR WHILE QUERYING DATABASE => " + err);
                console.log("END KPI");
                res.status(500).send(err.message);
                return;
            });
        }
    };
    
    console.log("DASHBOARD CONTROLLER END");

    return me;
};