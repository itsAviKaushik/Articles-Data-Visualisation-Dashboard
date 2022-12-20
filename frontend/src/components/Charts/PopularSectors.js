import React, { useEffect, useState } from 'react'
import { AnimationOnScroll } from "react-animation-on-scroll"
import axios from 'axios'

function PopularSectors() {
    const [sectorData, setSectorData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get("/api/data/popularSectors")
                setSectorData(data.details.splice(0, 10));
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, []);

    return (
        <AnimationOnScroll animateIn='animate__fadeInRight' className="card">
            <div className="card-body">
                <h4 className="card-title">Popular Sectors in Articles</h4>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th> Sector's Name </th>
                                <th> Total Articles </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sectorData.length > 0 && sectorData.map(e => {
                                return <tr key={e[0]}>
                                    <td> {e[0]} </td>
                                    <td> {e[1]} </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AnimationOnScroll>
    )
}

export default PopularSectors