import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';
import { AnimationOnScroll } from "react-animation-on-scroll"
import axios from 'axios';

function PopularSectorRelevency() {
    // const data = [
    //     ["City", "2010 Population"],
    //     ["New York City, NY", 8175000],
    //     ["Los Angeles, CA", 3792000],
    //     ["Chicago, IL", 2695000],
    //     ["Houston, TX", 2099000],
    //     ["Philadelphia, PA", 1526000],
    // ];

    const options = {
        title: "Popular Sectors by Relevance",
        chartArea: { width: "50%" },
        hAxis: {
            title: "Total Relevance",
            minValue: 0,
        },
        vAxis: {
            title: "Popular Sectors",
        },
    };

    const [sourcesData, setSourcesData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get("/api/data/popularSectorRelevancy")

                setSourcesData([
                    ["Sector", "Relevance"], ...data.details
                ]);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, []);
    return (
        sourcesData.length > 0 && <AnimationOnScroll animateIn='animate__fadeInRight' className="card">
            <div className="card-body">
                <h4 className="card-title">Popular Sectors by Relevance</h4>
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

export default PopularSectorRelevency