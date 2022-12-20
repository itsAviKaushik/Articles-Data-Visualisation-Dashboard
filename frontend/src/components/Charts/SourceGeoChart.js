import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';
import axios from 'axios'

function SourceGeoChart() {
    const options = {
        // colorAxis: { colors: ["#00853f", "black", "#0a391b"] },
        // backgroundColor: "#81d4fa",
        // datalessRegionColor: "#f8bbd0",
        defaultColor: "#f5f5f5",
    };

    const [geoData, setGeoData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get("/api/data/getCountryWiseTraffic");

                setGeoData(data.details);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, []);

    return (
        geoData.length > 0 &&
        <Chart
            // chartEvents={[
            //     {
            //         eventName: "select",
            //         callback: ({ chartWrapper }) => {
            //             const chart = chartWrapper.getChart();
            //             const selection = chart.getSelection();
            //             if (selection.length === 0) return;
            //             const region = data[selection[0].row + 1];
            //             console.log("Selected : " + region);
            //         },
            //     },
            // ]}
            chartType="GeoChart"
            width="100%"
            height="400px"
            data={[
                ["Country", "Source"],
                ...geoData
            ]}
            options={options}
        />
    )
}

export default SourceGeoChart