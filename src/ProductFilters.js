class ProductFilters {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                title: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        let restrictedProps= ["end_year", "page"];

        restrictedProps.forEach(element => {
            delete queryCopy[element];
        });

        let mydata = Object.keys(queryCopy).map((key) => {
            return [String(key), queryCopy[key]]
        })

        let myquery = {};

        mydata.forEach(element => {
            myquery[element[0]] = {
                $regex: element[1],
                $options: "i"
            }
        });

        this.query = this.query.find(myquery);

        if (this.queryStr.end_year) {
            this.query = this.query.find({end_year: this.queryStr.end_year});
        }

        return this;
    }


    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) | 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    };
}

module.exports = ProductFilters;