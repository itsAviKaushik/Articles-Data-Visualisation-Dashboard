import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';
import { AnimationOnScroll } from 'react-animation-on-scroll'
import axios from 'axios'

function PopularCompanyPerformance({ data }) {
    const options = {
        title: "Sources Performance",
        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        chartArea: { width: "50%", height: "70%" },
    };

    const [actualData, setActualData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get("/api/data/recentSourcesTableData");
                setActualData(data.details);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, [data])

    return (
        <AnimationOnScroll animateIn='animate__fadeInRight' className="card">
            <div className="card-body">
                <h4 className="card-title"> Popular Source Performance Area Chart </h4>
                <Chart
                    chartType="AreaChart"
                    width="100%"
                    height="400px"
                    data={[
                        ["Company", "Performance"],
                        ...actualData
                    ]}
                    options={options}
                />
            </div>
        </AnimationOnScroll>
    )
}

export default PopularCompanyPerformance