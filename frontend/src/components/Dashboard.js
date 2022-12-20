import React, { useEffect, useState } from 'react'
import PopularRegion from './Charts/PopularRegion';
import PopularRegionRelevency from './Charts/PopularRegionRelevency';
import ComboChartComparison from './Charts/ComboChartComparison';
import PopularCompanyPerformance from './Charts/PopularCompanyPerformance';
import PopularSectorIntensity from './Charts/PopularSectorIntensity';
import PopularSectorRatio from './Charts/PopularSectorRatio';
import PopularSectorRelevency from './Charts/PopularSectorRelevency';
import PopularSectors from './Charts/PopularSectors';
import RecentSourcesTable from './Charts/RecentSourcesTable';
import SourceGeoChart from './Charts/SourceGeoChart'
import YearWiseChart from './Charts/YearWiseChart'
import PopularRegionRatio from './Charts/PopularRegionRatio';
import TopSourcesChart from './Charts/TopSourcesChart';
import PopularCountryRatio from './Charts/PopularCountryRatio';
import axios from 'axios';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import PopularRegionLineChart from './Charts/PopularRegionLineChart';
import PopularTopicTable from './Charts/PopularTopicTable';
import PopularTopicBar from './Charts/PopularTopicBar';
import PopularTopicBarChart from './Charts/PopularTopicBarChart';
import Loader from './Loader';

function Dashboard() {
    const [totalArticles, setTotalArticles] = useState(0);
    const [loading, setLoading] = useState(false);
    const [averageIntensity, setAverageIntensity] = useState(0);
    const [averageRelevance, setAverageRelevance] = useState(0);

    useEffect(() => {
        async function getDashboard() {
            try {
                setLoading(true);
                const { data } = await axios.get("/api/data/dashboard");

                setTotalArticles(data.totalArticles);
                setAverageIntensity(data.averageIntensity);
                setAverageRelevance(data.averageRelevance);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getDashboard();
    }, []);

    return (
        <>
            {loading && <div style={{
                position: "fixed",
                top: 0, left: 0,
                width: "100vw", height: "100vh",
                background: "white",
                zIndex: 10
            }}>
                <Loader />
            </div>}
            <div className="main-panel animate__animated animate__fadeInRight" >
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="mdi mdi-home" />
                            </span> Dashboard
                        </h3>
                        <nav aria-label="breadcrumb">
                        </nav>
                    </div>
                    <div className="row">
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-danger card-img-holder text-white">
                                <div className="card-body">
                                    <img src="/includes/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
                                    <h4 className="font-weight-normal mb-3">Total Articles <i className="mdi mdi-chart-line mdi-24px float-right" />
                                    </h4>
                                    <h2 className="mb-5"> {totalArticles} </h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-info card-img-holder text-white">
                                <div className="card-body">
                                    <img src="/includes/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
                                    <h4 className="font-weight-normal mb-3"> Average Article Relevancy <i className="mdi mdi-bookmark-outline mdi-24px float-right" />
                                    </h4>
                                    <h2 className="mb-5"> {averageRelevance} </h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="card bg-gradient-success card-img-holder text-white">
                                <div className="card-body">
                                    <img src="/includes/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
                                    <h4 className="font-weight-normal mb-3">Average Article Intensity <i className="mdi mdi-diamond mdi-24px float-right" />
                                    </h4>
                                    <h2 className="mb-5"> {averageIntensity} </h2>
                                    {/* <h6 className="card-text">Increased by 5%</h6> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h3 className="page-title" style={{ paddingBottom: "1rem" }}>
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="mdi mdi-chart-areaspline" />
                            </span> Articles Statistics
                        </h3>
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="animate__animated animate__fadeInLeft card">
                                <div className="card-body">
                                    <div className="clearfix">
                                        <h4 className="card-title float-left">Articles Yearwise Statistics</h4>
                                        <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right" />
                                    </div>
                                    <YearWiseChart />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <h3 className="page-title" style={{ paddingBottom: "1rem" }}>
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="mdi mdi-chart-areaspline" />
                            </span> Countriwise Statistics
                        </h3>
                        <div className="col-md-7 grid-margin">
                            <TopSourcesChart />
                        </div>
                        <div className="col-md-5 grid-margin stretch-card">
                            <AnimationOnScroll animateIn='animate__fadeInRight' className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Article Traffic Sources</h4>
                                    <SourceGeoChart />
                                    <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4" />
                                </div>
                            </AnimationOnScroll>
                        </div>
                        <div className="col-md-12 grid-margin">
                            <PopularCountryRatio />
                        </div>
                    </div>

                    {/* <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <PopularSectorIntensity />
                    </div>
                </div> */}


                    <div className="row">
                        <h3 className="page-title" style={{ paddingBottom: "1rem" }}>
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="mdi mdi-chart-areaspline" />
                            </span> Topics Statistics
                        </h3>
                        <div className="col-md-6 grid-margin stretch-card">
                            <PopularTopicTable />
                        </div>
                        <div className="col-md-6 grid-margin stretch-card">
                            <PopularTopicBarChart />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <PopularTopicBar />
                        </div>
                    </div>

                    <div className="row">
                        <h3 className="page-title" style={{ paddingBottom: "1rem" }}>
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="mdi mdi-chart-areaspline" />
                            </span> Sources Statistics
                        </h3>
                        <div className="col-12 grid-margin stretch-card">
                            <RecentSourcesTable />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 grid-margin stretch-card">
                            <ComboChartComparison />
                        </div>
                        <div className="col-md-6 grid-margin stretch-card">
                            <PopularCompanyPerformance />
                        </div>
                    </div>

                    <div className="row">
                        <h3 className="page-title" style={{ paddingBottom: "1rem" }}>
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="mdi mdi-chart-areaspline" />
                            </span> Articles Regionwise Statistics
                        </h3>
                        <div className="col-md-7 grid-margin">
                            <PopularRegion />
                        </div>
                        <div className="col-md-5 grid-margin stretch-card">
                            <AnimationOnScroll animateIn='animate__fadeInRight' className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Popular Region Line Chart</h4>
                                    <PopularRegionLineChart />
                                    <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4" />
                                </div>
                            </AnimationOnScroll>
                        </div>
                        <div className="col-md-12 grid-margin stretch-card">
                            <PopularRegionRatio />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            <PopularRegionRelevency />
                        </div>
                    </div>

                    <div className="row">
                        <h3 className="page-title" style={{ paddingBottom: "1rem" }}>
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="mdi mdi-chart-areaspline" />
                            </span> Articles Sector Statistics
                        </h3>
                        <div className="col-md-7 grid-margin">
                            <PopularSectors />
                        </div>
                        <div className="col-md-5 grid-margin stretch-card">
                            <PopularSectorRatio />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            <PopularSectorRelevency />
                        </div>
                        <div className="col-md-12 grid-margin">
                            <PopularSectorIntensity />
                        </div>
                        <div className="col-md-5 grid-margin stretch-card">
                            <div className="card">
                                <PopularSectorRatio />
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
           <div className="col-12 grid-margin stretch-card">
               <div className="card">
                   <div className="card-body">
                       <h4 className="card-title">Recent Updates</h4>
                       <div className="d-flex">
                           <div className="d-flex align-items-center me-4 text-muted font-weight-light">
                               <i className="mdi mdi-account-outline icon-sm me-2" />
                               <span>jack Menqu</span>
                           </div>
                           <div className="d-flex align-items-center text-muted font-weight-light">
                               <i className="mdi mdi-clock icon-sm me-2" />
                               <span>October 3rd, 2018</span>
                           </div>
                       </div>
                       <div className="row mt-3">
                           <div className="col-6 pe-1">
                               <img src="/includes/images/dashboard/img_1.jpg" className="mb-2 mw-100 w-100 rounded" alt="avatar" />
                               <img src="/includes/images/dashboard/img_4.jpg" className="mw-100 w-100 rounded" alt="avatar" />
                           </div>
                           <div className="col-6 ps-1">
                               <img src="/includes/images/dashboard/img_2.jpg" className="mb-2 mw-100 w-100 rounded" alt="avatar" />
                               <img src="/includes/images/dashboard/img_3.jpg" className="mw-100 w-100 rounded" alt="avatar" />
                           </div>
                       </div>
                       <div className="d-flex mt-5 align-items-top">
                           <img src="/includes/images/faces/face3.jpg" className="img-sm rounded-circle me-3" alt="avatar" />
                           <div className="mb-0 flex-grow">
                               <h5 className="me-2 mb-2">School Website - Authentication Module.</h5>
                               <p className="mb-0 font-weight-light">It is a long established fact that a reader will be distracted by the readable content of a page.</p>
                           </div>
                           <div className="ms-auto">
                               <i className="mdi mdi-heart-outline text-muted" />
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div> */}
                </div>
            </div >
        </>
    )
}

export default Dashboard