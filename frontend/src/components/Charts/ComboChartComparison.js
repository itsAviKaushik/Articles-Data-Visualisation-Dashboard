import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import { AnimationOnScroll } from 'react-animation-on-scroll'
import axios from 'axios';

function ComboChartComparison() {
    const options = {
        vAxis: { title: "Cups" },
        hAxis: { title: "Month" },
        seriesType: "bars",
        series: { 5: { type: "line" } },
    };
    const [actualData, setActualData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get("/api/data/topSourcesComparison");
                setActualData(data.details);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, [])

    return (
        <AnimationOnScroll animateIn='animate__fadeInLeft' className="card">
            <div className="card-body">
                <h4 className="card-title"> Top Articles Sources Comparison Yearwise </h4>
                <Chart
                    chartType="ComboChart"
                    width="100%"
                    height="400px"
                    data={actualData}
                    options={options}
                />
            </div>
        </AnimationOnScroll>
    )
}

export default ComboChartComparison