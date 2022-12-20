import React, { useEffect, useState } from 'react'
import { AnimationOnScroll } from "react-animation-on-scroll"
import axios from 'axios'

function PopularRegion() {
    const [regionData, setRegionData] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get("/api/data/getRegionDetails");

                setRegionData(data.details.slice(0, 10));
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, []);

    return (
        <AnimationOnScroll animateIn='animate__fadeInRight' className="card">
            <div className="card-body">
                <h4 className="card-title">Top 10 Popular Region in Articles</h4>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th> Region's Name </th>
                                <th> Total Articles </th>
                                <th> Average Relevance </th>
                                <th> Average Intensity </th>
                            </tr>
                        </thead>
                        <tbody>
                            {regionData.length > 0 && regionData.map(e => {
                                return <tr key={e[0]}>
                                    <td> {e[0]} </td>
                                    <td> {e[1].numberofArticles} </td>
                                    <td>
                                        <label className="badge badge-gradient-success"> {e[1].relevance}  </label>
                                    </td>
                                    <td> {e[1].intensity} </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AnimationOnScroll>
    )
}

export default PopularRegion