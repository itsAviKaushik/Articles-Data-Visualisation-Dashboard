import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Loader from './Loader';

function AllArticles() {
    const [articles, setArticles] = useState({ data: [] });
    const [filters, setFilters] = useState({ page: 1 });
    const [loading, setLoading] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState("topic");
    const filterInput = useRef(null);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const { data } = await axios.post("/api/data/fetchArticles", filters);

                setArticles(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [filters]);

    useEffect(() => {
        if (filterInput.current) {
            filterInput.current.value = "";
        }
    }, [selectedProperty]);


    const previous = () => { console.log("Hiii"); setFilters({ ...filters, page: filters.page - 1 }) }

    const next = () => { setFilters({ ...filters, page: filters.page + 1 }) }

    return (
        <div className="main-panel animate__animated animate__fadeInRight" >
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">
                        <span className="page-title-icon bg-gradient-primary text-white me-2">
                            <i className="mdi mdi-home" />
                        </span> All Articles
                    </h3>
                    <nav aria-label="breadcrumb">
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body" style={{ padding: "1rem 2.5rem" }}>
                                <h4 className="card-title">Filters</h4>
                                {/* <p className="card-description"> Basic form layout </p> */}
                                <form className="forms-sample">
                                    <div className="row">
                                        <div className="form-group col-md-12" style={{
                                            display: "flex"
                                        }}>
                                            <div className="select-wrapper selectdiv">
                                                <select className="select" onChange={(e) => { setSelectedProperty(e.target.value) }} value={selectedProperty}>
                                                    <option value="topic">Topic</option>
                                                    <option value="sector">Sector</option>
                                                    <option value="region">Region</option>
                                                    <option value="source">Source</option>
                                                    <option value="country">Country</option>
                                                </select>
                                            </div>
                                            <input type="text" ref={filterInput} className="form-control" onChange={(e) => { setFilters({ ...filters, [selectedProperty]: e.target.value }) }} id="exampleInputUsername1" placeholder={`Search for ${selectedProperty}`} />
                                        </div>
                                        <div className="form-group col-md-6" style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem"
                                        }}>
                                            <label htmlFor="exampleInputEmail1" style={{ width: "30%" }}>End Year</label>
                                            <input type="number" min={1000} max={2099} onChange={(e) => { setFilters({ ...filters, end_year: Number(e.target.value) }) }} className="form-control" id="exampleInputEmail1" placeholder="Enter a End Year" />
                                        </div>
                                        <div className="form-group col-md-6" style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem"
                                        }}>
                                            <label htmlFor="exampleInputEmail1" style={{ width: "30%" }}>Pestle Rank</label>
                                            <input type="text" className="form-control" onChange={(e) => { setFilters({ ...filters, pestle: e.target.value }) }} id="exampleInputEmail1" placeholder="Enter a PESTLE Rank" />
                                        </div>
                                        {/* <div className="form-group col-md-6">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
                                            <input type="password" className="form-control" id="exampleInputConfirmPassword1" placeholder="Password" />
                                        </div> */}
                                        {/* <div className="form-check form-check-flat form-check-primary">
                                            <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" /> Remember me </label>
                                            </div> */}
                                    </div>
                                    {/* <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                                    <button className="btn btn-light">Cancel</button> */}
                                </form>
                                <div>
                                    <button onClick={(e) => { e.preventDefault(); setFilters({ page: 1 }); filterInput.current.value = ""; }} className='btn-gradient-primary btn'> Reset</button>
                                    <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: ".5rem" }}> {Object.keys(filters).map((key, i) => {
                                        if (["topic", "sector", "region", "source", "country", "end_year", "pestle"].includes(key)) {
                                            if (filters[key] !== "" && filters[key]) {
                                                if (i === 1) {
                                                    return <Fragment key={key}><span style={{ fontSize: "15px" }}>Active Filters : </span> <div className="badge badge-gradient-success">{`${key[0].toUpperCase() + key.slice(1, key.length)}`}</div> </Fragment>
                                                }
                                                else {
                                                    return <div key={key} className="badge badge-gradient-success">{`${key[0].toUpperCase() + key.slice(1, key.length)}`}</div>
                                                }
                                            }
                                            else {
                                                return false;
                                            }
                                        }
                                        else {
                                            return false;
                                        }
                                    })} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <h4 style={{ padding: "1rem" }}> {articles.totalResults} Results </h4>
                            <div className="data-table-buttons" style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "1rem",
                                paddingTop: 0,
                                alignItems: "center"
                            }}>
                                <button disabled={filters.page <= 1} onClick={previous} className='btn-gradient-primary btn'> &larr; Previous</button>
                                <button disabled={filters.page * 10 >= articles.totalResults} onClick={next} className='btn-gradient-primary btn'> Next &rarr;</button>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th> # </th>
                                            <th> Source Title </th>
                                            <th> Topic </th>
                                            <th> Region </th>
                                            <th> Country </th>
                                            <th> Sector </th>
                                            <th> Relevance </th>
                                            <th> Intensity </th>
                                            <th> PESTLE </th>
                                            <th> Likelihood </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ?
                                            <tr>
                                                <td colSpan={9}><Loader /></td>
                                            </tr>
                                            :
                                            articles.data.length > 0 && articles.data.map((e, i) => {
                                                return <tr key={e._id}>
                                                    <td> {((filters.page - 1) * 10) + i + 1} </td>
                                                    <td> {e.title.slice(0, 40)} {e.title.length > 40 && "..."} </td>
                                                    <td> {e.topic} </td>
                                                    <td> {e.region ? e.region : "Not Known"} </td>
                                                    <td> {e.country ? e.country : "Not Known"} </td>
                                                    <td> {e.sector ? e.sector : "Not Known"} </td>
                                                    <td> {e.relevance} </td>
                                                    <td> {e.intensity} </td>
                                                    <td> {e.pestle} </td>
                                                    <td> {e.likelihood} </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="data-table-buttons" style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "1rem"
                            }}>
                                <button disabled={filters.page <= 1} onClick={previous} className='btn-gradient-primary btn'> &larr; Previous</button>
                                <button disabled={filters.page * 10 >= articles.totalResults} onClick={next} className='btn-gradient-primary btn'> Next &rarr;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllArticles