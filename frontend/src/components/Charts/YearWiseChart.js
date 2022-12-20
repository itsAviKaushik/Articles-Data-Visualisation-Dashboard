import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';
import axios from 'axios'

function YearWiseChart() {
    // Variable to store the data of column chart.
    const [columnChartData, setColumnChartData] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get("/api/data/totalArticleYearWise");

                setColumnChartData(data.details);
            } catch (error) {
                console.log(error);
            } finally {
                // setLoading(false);
            }
        }

        getData();
    }, []);

    return (
        columnChartData.length > 0 && <Chart chartType="AreaChart" width="100%" height="400px" data={[
            ["Years", "Number of Articles"],
            ...columnChartData
        ]} />
    )
}

export default YearWiseChart