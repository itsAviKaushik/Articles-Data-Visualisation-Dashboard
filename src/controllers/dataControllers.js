const checkErrors = require("../middlewares/checkErrors");
const Data = require("../models/Data");
const ProductFilters = require("../ProductFilters");

exports.getDashboardCardDetails = checkErrors(async (req, res, next) => {
    // Fetches data of cards present in dashboard.
    // i.e Fetches total Articles available.

    // Counting the total number of data collections in a database.
    const totalArticles = await Data.count();

    // Calculating the average of the Relevance of all data in database.
    // Used MongoDB or mongoose Aggregations to calculate average.
    const [{ averageRelevance }] = await Data.aggregate(
        [
            {
                $group:
                {
                    "_id": "_id",
                    averageRelevance: { $avg: "$relevance" }
                }
            }
        ]
    )

    // Calculating the average of the intensity of all data in database.
    // Used MongoDB or mongoose Aggregations to calculate average.
    const [{ averageIntensity }] = await Data.aggregate(
        [
            {
                $group:
                {
                    "_id": "_id",
                    averageIntensity: { $avg: "$intensity" }
                }
            }
        ]
    )

    res.json({
        success: true, totalArticles,
        averageRelevance: averageRelevance.toFixed(2),
        averageIntensity: averageIntensity.toFixed(2)
    });
});

exports.getTotalArticleYearwise = checkErrors(async (req, res, next) => {
    const data = await Data.find();
    let details = [];

    // getting the data for number of article yearwise.
    data.map(e => {

        // Fetching the year from the published property of the acticle document.
        let year = new Date(e.published).getFullYear();

        // eslint-disable-next-line
        if (!year) return;

        if (details.filter(e => e[0] == year).length > 0) {
            details.map(e => {
                if (e[0] == year) {
                    e[1] = Number(e[1]) + 1
                }
            })
            // details[year] = Number(details[year]) + 1
        }
        else {
            details.push([year, 1])
        }
        return 0;
    })

    details = details.sort(function (a, b) {
        return a[0] - b[0];
    })

    res.json({ success: true, details });

})

exports.getCountryWiseTraffic = checkErrors(async (req, res, next) => {
    let details = [];

    const data = await Data.find();

    data.map(e => {
        if (details.filter(elem => elem[0] == e.country).length > 0) {
            details.map(elem => {
                if (elem[0] == e.country) {
                    elem[1] = Number(elem[1]) + 1
                }
            })
            // details[year] = Number(details[year]) + 1
        }
        else {
            details.push([e.country, 1])
        }
        return 0;
    })

    details = details.filter(e => e[0] != "");

    details.map(e => {
        if (e[0] === "United States of America") {
            e[0] = "United States"
        }
    })

    res.json({ success: true, details });
})

exports.getRegionDetails = checkErrors(async (req, res, next) => {
    let details = [];

    const data = await Data.find();

    data.map(e => {
        if (details.filter(elem => elem[0] == e.region).length > 0) {
            details.map(elem => {
                if (elem[0] == e.region) {
                    elem[1] = {
                        ...elem[1],
                        numberofArticles: Number(elem[1].numberofArticles) + 1,
                        relevance: elem[1].relevance.concat(e.relevance),
                        intensity: elem[1].intensity.concat(e.intensity)
                    }
                }
            })
            // details[year] = Number(details[year]) + 1
        }
        else {
            details.push([e.region, {
                numberofArticles: 1,
                relevance: [e.relevance],
                intensity: [e.intensity]
            }])
        }
        return 0;
    })

    details = details.filter(e => e[0] != "");

    details = details.sort(function (a, b) {
        return b[1].numberofArticles - a[1].numberofArticles;
    });

    function addArrayElem(array) {
        let sum = 0;

        array.forEach(element => {
            sum = sum + Number(element);
        });

        return sum;
    }

    details.map(e => {
        e[1].relevance = (addArrayElem(e[1].relevance) / e[1].relevance.length).toFixed(2),
            e[1].intensity = (addArrayElem(e[1].intensity) / e[1].intensity.length).toFixed(2)
    });

    res.json({ success: true, details });
});

exports.popularRegionRelevancy = checkErrors(async (req, res, next) => {
    let details = [];

    const data = await Data.find();

    data.map(e => {
        if (details.filter(elem => elem[0] == e.region).length > 0) {
            details.map(elem => {
                if (elem[0] == e.region) {
                    elem[1] = Number(elem[1]) + 1
                }
            })
        }
        else {
            details.push([e.region, 1]);
        }
        return 0;
    });

    details = details.filter(e => e[0] !== "");

    res.json({ success: true, details });
})

exports.comboChartComparisonTopSources = checkErrors(async (req, res, next) => {
    const data = await Data.find();

    let details = {};

    data.map(e => {
        if (details[e.source]) {
            details[e.source] = Number(details[e.source]) + 1
        }
        else {
            details[e.source] = 1;
        }
        return 0;
    })

    let topSources = Object.keys(details).map((key) => {
        return [key === "" ? "Not Known" : String(key), details[key]]
    })

    topSources.sort(function (a, b) {
        return b[1] - a[1]
    })

    topSources = topSources.splice(0, 5);
    let allInfo = [];

    topSources.map(e => {
        let total = data.filter(elem => elem.source === e[0]);
        let info = {};

        total.map(e => {
            let year = new Date(e.published).getFullYear();

            // eslint-disable-next-line
            if (!year) return

            if (info[year]) {
                info[year] = Number(info[year]) + 1;
            }
            else {
                info[year] = 1
            }

            return 0;
        });

        allInfo[e[0]] = info;

        return 0;
    })

    let myArray = topSources.map(e => e[0])

    topSources = myArray;

    let years = [];

    data.map(e => {
        if (myArray.includes(e.source)) {
            let date = new Date(e.published).getFullYear();

            // eslint-disable-next-line
            if (!date) return;

            if (!years.includes(date)) {
                years.push(date);
            }
        }

        return 0;
    });

    years = years.sort(function (a, b) { return a - b });

    let actualData = [];

    actualData.push(["Years", ...topSources]);

    years.map(e => {
        let temp = [];
        temp.push(e);

        Object.keys(allInfo).map((key) => {
            let value = allInfo[key][e];

            if (value) {
                temp.push(value);
            }
            else {
                temp.push(0);
            }

            // eslint-disable-next-line
            return;
        })

        actualData.push(temp);

        return 0;
    });

    res.json({ success: true, details: actualData })
});

exports.popularCompanyPerformance = checkErrors(async (req, res, next) => {
    const data = await Data.find();

    let details = {};

    data.map(e => {
        if (details[e.source]) {
            details[e.source] = Number(details[e.source]) + 1
        }
        else {
            details[e.source] = 1;
        }
        return 0;
    })

    let topSources = Object.keys(details).map((key) => {
        return [key === "" ? "Not Known" : String(key), details[key]]
    })

    topSources.sort(function (a, b) {
        return b[1] - a[1]
    })

    topSources = topSources.splice(0, 5);
    let allInfo = [];

    topSources.map(e => {
        let total = data.filter(elem => elem.source === e[0]);
        let info = {};

        total.map(e => {
            let year = new Date(e.published).getFullYear();

            // eslint-disable-next-line
            if (!year) return

            if (info[year]) {
                info[year] = Number(info[year]) + 1;
            }
            else {
                info[year] = 1
            }

            return 0;
        });

        allInfo[e[0]] = info;

        return 0;
    })

    let myArray = topSources.map(e => e[0])

    topSources = myArray;

    let years = [];

    data.map(e => {
        if (myArray.includes(e.source)) {
            let date = new Date(e.published).getFullYear();

            // eslint-disable-next-line
            if (!date) return;

            if (!years.includes(date)) {
                years.push(date);
            }
        }

        return 0;
    });

    years = years.sort(function (a, b) { return a - b });

    let actualData = [];

    actualData.push(["Years", ...topSources]);

    years.map(e => {
        let temp = [];
        temp.push(e);

        Object.keys(allInfo).map((key) => {
            let value = allInfo[key][e];

            if (value) {
                temp.push(value);
            }
            else {
                temp.push(0);
            }

            // eslint-disable-next-line
            return;
        })

        actualData.push(temp);

        return 0;
    });

    res.json({ success: true, details: actualData });
});

exports.popularSectorIntensity = checkErrors(async (req, res, next) => {
    let details = {};

    const data = await Data.find();

    data.map(e => {
        if (details[e.sector]) {
            details[e.sector] = [
                details[e.sector][0] + Number(e.intensity),
                details[e.sector][1] + 1
            ]
        }
        else {
            details[e.sector] = [Number(e.intensity), 1];
        }
        return 0;
    })

    let mydata = Object.keys(details).map((key) => {
        return [key === "" ? "Not Known" : String(key), details[key]]
    })

    let newArray = [];

    mydata.map(e => {
        return newArray.push([e[0], e[1][0] / e[1][1]]);
    });

    res.json({ success: true, details: newArray });
});

exports.popularSectorRatio = checkErrors(async (req, res, next) => {
    let details = {};

    const data = await Data.find();

    data.map(e => {
        if (details[e.sector]) {
            details[e.sector] = Number(details[e.sector]) + 1
        }
        else {
            details[e.sector] = 1;
        }
        return 0;
    })

    // Setting the yearwise data to graph data variable.
    let myArray = Object.keys(details).map((key) => {
        // eslint-disable-next-line
        if (key === "") return;
        return [String(key), details[key]]
    });

    myArray = myArray.sort(function (a, b) {
        return b[1] - a[1]
    })

    res.json({ success: true, details: myArray });
});

exports.popularRegionRatio = checkErrors(async (req, res, next) => {
    let details = {};

    const data = await Data.find();

    data.map(e => {
        if (details[e.region]) {
            details[e.region] = Number(details[e.region]) + 1
        }
        else {
            details[e.region] = 1;
        }
        return 0;
    })

    // Setting the yearwise data to graph data variable.
    let myArray = Object.keys(details).map((key) => {
        // eslint-disable-next-line
        if (key === "") return;
        return [String(key), details[key]]
    });

    myArray = myArray.sort(function (a, b) {
        return b[1] - a[1]
    })

    res.json({ success: true, details: myArray });
});

exports.popularSectorRelevancy = checkErrors(async (req, res, next) => {
    let details = {};

    const data = await Data.find();

    data.map(e => {
        if (details[e.sector]) {
            details[e.sector] = [
                details[e.sector][0] + e.relevance,
                details[e.sector][1] + 1
            ]
        }
        else {
            details[e.sector] = [e.relevance, 1];
        }
        return 0;
    })

    let mydata = Object.keys(details).map((key) => {
        return [key === "" ? "Not Known" : String(key), details[key]]
    })

    let newArray = [];

    mydata.map(e => {
        return newArray.push([e[0], e[1][0] / e[1][1]]);
    });

    res.json({ success: true, details: newArray });
});

exports.popularSectors = checkErrors(async (req, res, next) => {
    let details = {};

    const data = await Data.find();

    data.map(e => {
        if (details[e.sector]) {
            details[e.sector] = Number(details[e.sector]) + 1
        }
        else {
            details[e.sector] = 1;
        }
        return 0;
    })

    // Setting the yearwise data to graph data variable.
    let myArray = Object.keys(details).map((key) => {
        // eslint-disable-next-line
        if (key === "") return;
        return [String(key), details[key]]
    });

    myArray = myArray.sort(function (a, b) {
        return b[1] - a[1]
    })

    res.json({ success: true, details: myArray });
})

exports.recentSourcesTableData = checkErrors(async (req, res, next) => {
    let details = {};

    const data = await Data.find();

    data.map(e => {
        if (details[e.source]) {
            details[e.source] = Number(details[e.source]) + 1
        }
        else {
            details[e.source] = 1;
        }
        return 0;
    })

    let mydata = Object.keys(details).map((key) => {
        return [key === "" ? "Not Known" : String(key), details[key]]
    })

    mydata = mydata.sort(function (a, b) {
        return b[1] - a[1]
    })

    res.json({ success: true, details: mydata });
})

exports.popularTopics = checkErrors(async (req, res, next) => {
    let details = {};

    const data = await Data.find();

    data.map(e => {
        if (details[e.topic]) {
            details[e.topic] = Number(details[e.topic]) + 1
        }
        else {
            details[e.topic] = 1;
        }
        return 0;
    })

    // Setting the yearwise data to graph data variable.
    let myArray = Object.keys(details).map((key) => {
        // eslint-disable-next-line
        if (key === "") return;
        return [String(key), details[key]]
    });

    myArray = myArray.sort(function (a, b) {
        return b[1] - a[1]
    })

    res.json({ success: true, details: myArray });
})

exports.fetchArticles = checkErrors(async (req, res, next) => {
    const data = new ProductFilters(Data.find(), req.body).search().filter();

    let articles = await data.query;

    const totalResults = articles.length;

    const currentPage = Number(req.body.page) || 1;

    const skip = 10 * (currentPage - 1);

    articles = articles.splice(skip, articles.length);

    articles = articles.splice(0, 10);

    res.json({ success: true, totalResults, data: articles });
});