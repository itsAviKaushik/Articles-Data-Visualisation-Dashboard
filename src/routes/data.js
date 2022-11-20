const { getDashboardCardDetails, getTotalArticleYearwise,
    getCountryWiseTraffic,
    getRegionDetails,
    popularRegionRelevancy,
    comboChartComparisonTopSources,
    popularCompanyPerformance,
    popularSectorIntensity,
    popularSectorRatio,
    popularSectorRelevancy,
    popularSectors,
    recentSourcesTableData,
    popularRegionRatio,
    fetchArticles,
    popularTopics
} = require("../controllers/dataControllers");

const router = require("express").Router();

router.get("/dashboard", getDashboardCardDetails);

router.get("/totalArticleYearWise", getTotalArticleYearwise);

router.get("/getCountryWiseTraffic", getCountryWiseTraffic);

router.get("/getRegionDetails", getRegionDetails);

router.get("/popularRegionRelevancy", popularRegionRelevancy);

router.get("/topSourcesComparison", comboChartComparisonTopSources);

router.get("/popularCompanyPerformance", popularCompanyPerformance);

router.get("/popularSectorIntensity", popularSectorIntensity);

router.get("/popularSectorRelevancy", popularSectorRelevancy);

router.get("/popularSectorRatio", popularSectorRatio);

router.get("/popularRegionRatio", popularRegionRatio);

router.get("/popularSectors", popularSectors);

router.get("/recentSourcesTableData", recentSourcesTableData);

router.post("/fetchArticles", fetchArticles);

router.get("/popularTopics", popularTopics);

module.exports = router;