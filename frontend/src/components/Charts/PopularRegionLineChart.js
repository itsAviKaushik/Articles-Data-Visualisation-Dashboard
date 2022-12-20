import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';

function PopularRegionLineChart() {
    // Variable to store the data of column chart.
    const [columnChartData, setColumnChartData] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get("/api/data/popularRegionRatio");

                setColumnChartData(data.details.splice(0, data.details.length - 1));
            } catch (error) {
                console.log(error);
            } finally {
                // setLoading(false);
            }
        }

        getData();
    }, []);

    return (
        columnChartData.length > 0 && <Chart chartType="BarChart" width="100%" height="400px" data={[
            ["Years", "Number of Articles"],
            ...columnChartData
        ]} />
    )
}

export default PopularRegionLineChart