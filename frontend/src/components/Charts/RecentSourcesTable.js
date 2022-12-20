import React, { useEffect, useState } from 'react'
import { AnimationOnScroll } from 'react-animation-on-scroll'
import axios from 'axios'

function RecentSourcesTable() {
  const [sourcesData, setSourcesData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get("/api/data/recentSourcesTableData")

        setSourcesData(data.details.splice(0, 10));
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  return (
    <AnimationOnScroll animateIn='animate__fadeInUp' className="card">
      <div className="card-body">
        <h4 className="card-title"> Top Articles Sources </h4>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th> # </th>
                <th> Source Name </th>
                <th> Total Articles </th>
                <th> Total Portion of Articles </th>
              </tr>
            </thead>
            <tbody>
              {sourcesData.length > 0 && sourcesData.map((e, i) => {
                return <tr key={i}>
                  <td> {i + 1} </td>
                  <td> {e[0]} </td>
                  <td> {e[1]} </td>
                  <td>
                    <div className="progress">
                      <div className="progress-bar bg-gradient-success" role="progressbar" style={{ width: `${(e[1] / sourcesData.length)}%`, height: "100%" }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AnimationOnScroll>
  )
}

export default RecentSourcesTable