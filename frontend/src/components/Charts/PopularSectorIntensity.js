import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';
import { AnimationOnScroll } from 'react-animation-on-scroll'
import axios from 'axios'

function PopularSectorIntensity() {
    // const data = [
    //     ["City", "2010 Population"],
    //     ["New York City, NY", 8175000],
    //     ["Los Angeles, CA", 3792000],
    //     ["Chicago, IL", 2695000],
    //     ["Houston, TX", 2099000],
    //     ["Philadelphia, PA", 1526000],
    // ];

    const options = {
        title: "Popular Sectors by intensity",
        chartArea: { width: "50%" },
        hAxis: {
            title: "Total intensity",
            minValue: 0,
        },
        colors: ["#b87333"],
        vAxis: {
            title: "Popular Sectors",
        },
    };

    const [sourcesData, setSourcesData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const {data}= await axios.get("/api/data/popularSectorIntensity");

                setSourcesData([
                    ["Sector", "intensity"], ...data.details
                ]);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, []);

    return (
        sourcesData.length > 0 && <AnimationOnScroll animateIn='animate__fadeInLeft' className="card">
            <div className="card-body">
                <h4 className="card-title">Popular Sectors by intensity</h4>
                <Chart
                    chartType="BarChart"
                    width="100%"
                    height="600px"
                    data={sourcesData}
                    options={options}
                />
            </div>
        </AnimationOnScroll>
    )
}

export default PopularSectorIntensity