import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AnimationOnScroll } from 'react-animation-on-scroll';
import Chart from 'react-google-charts';

function PopularTopicBarChart() {
    const [geoData, setGeoData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get("/api/data/popularTopics");

                setGeoData(data.details.splice(0, 10));
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, []);
    return (
        geoData.length > 0 && <AnimationOnScroll animateIn='animate__fadeInRight' className="card">
            <div className="card-body">
                <h4 className="card-title">Popular Topics in Articles</h4>
                <Chart chartType="BarChart" width="100%" height="400px" data={[
                    ["Topics", "Number of Articles"],
                    ...geoData
                ]} />
            </div>
        </AnimationOnScroll>
    )
}

export default PopularTopicBarChart