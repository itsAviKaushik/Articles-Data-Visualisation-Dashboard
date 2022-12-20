import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Avichal from '../assets/images/avichal.jpg'
import AllArticles from './AllArticles'
import Dashboard from './Dashboard'

function Home() {
    return (
        <>
            <div className="container-fluid page-body-wrapper">
                {/* partial:partials/_sidebar.html */}
                <nav className=" animate__animated animate__fadeInLeft sidebar sidebar-offcanvas" id="sidebar">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <span className="menu-title">Dashboard</span>
                                <i className="mdi mdi-home menu-icon" />
                            </Link>
                            <Link className="nav-link" to="/allArticles">
                                <span className="menu-title">All Articles Filters</span>
                                <i className="mdi mdi-home menu-icon" />
                            </Link>
                        </li>
                        <li className="nav-item nav-profile" >
                            <Link to="/" className="nav-link" style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "2rem"
                            }}>
                                <div className="nav-profile-image" style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                    height: "100%"
                                }}>
                                    <img style={{
                                        width: "150px",
                                        height: "150px"
                                    }} src={Avichal} alt="profile" />
                                    <span className="login-status online" />
                                    {/* <i className="mdi mdi-bookmark-check text-success nav-profile-badge" /> */}
                                    {/*change to offline or busy as needed*/}
                                </div>
                                <div style={{
                                    display: "flex",
                                    width: "100%",
                                    alignItems: "center",
                                    margin: 0
                                }} className="nav-profile-text d-flex flex-column">
                                    <span className="font-weight-bold mb-2">Avichal Kaushik</span>
                                    <span className="text-secondary text-small">Web Developer</span>
                                    <span className="text-secondary my-2 text-small">MERN/MEAN Stack</span>
                                </div>
                            </Link>
                        </li>
                        <li className="nav-item sidebar-actions">
                            <span className="nav-link" style={{
                                display: "flex",
                                width: "100%",
                                flexDirection: "column",
                                alignItems: "center",
                            }}>
                                <div className="border-bottom">
                                    <h6 className="font-weight-normal mb-3">Projects By Me</h6>
                                </div>
                                <Link to='https://zevon.herokuapp.com' target="_blank" rel="noreferrer" className="btn btn-block btn-lg btn-gradient-primary mt-4">Zevon</Link>
                            </span>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path='/' element={<Dashboard />} />
                    <Route exact path='/allArticles' element={<AllArticles />} />
                </Routes>
            </div>
        </>
    )
}

export default Home