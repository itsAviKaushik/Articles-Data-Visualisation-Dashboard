import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AnimationOnScroll } from 'react-animation-on-scroll';
import Chart from 'react-google-charts';

function TopSourcesChart() {
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
        <AnimationOnScroll animateIn='animate__fadeInRight' className="card">
            <div className="card-body">
                <h4 className="card-title">Popular Countries in Articles</h4>
                <Chart chartType="ColumnChart" width="100%" height="400px" data={[
                    ["Sectors", "Number of Articles"],
                    ...geoData
                ]} />
            </div>
        </AnimationOnScroll>
    )
}

export default TopSourcesChart