import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';
import { AnimationOnScroll } from "react-animation-on-scroll"
import axios from 'axios'

function PopularCountryRatio() {
    const [sourcesData, setSourcesData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get("/api/data/getCountryWiseTraffic");

                setSourcesData([
                    ["Countries", "Number of Articles"],
                    ...data.details.splice(0, data.details.length - 1).sort(function (a, b) { return b[1] - a[1] })
                ]);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, []);

    return (
        <AnimationOnScroll animateIn='animate__fadeInLeft' className="card">
            <div className="card-body">
                <h4 className="card-title">Popular Country Ratio Chart</h4>
                {sourcesData.length > 0 && <Chart chartType="PieChart" width="100%" height="400px" data={sourcesData} />}
                < div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4" />
            </div>
        </AnimationOnScroll>
    )
}

export default PopularCountryRatio