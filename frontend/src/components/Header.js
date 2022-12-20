import React from 'react'
import { Link } from 'react-router-dom'
import Avichal from '../assets/images/avichal.jpg'

function Header() {
    return (
        <div className="animate__bounceInDown animate__animated navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <Link style={{ textDecoration: "none" }} to="/">
                    <h3 style={{ display: "flex", color: "#555", alignItems: "center" }}>Avichal Kaushik</h3>
                </Link>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-stretch">
                <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span className="mdi mdi-menu" />
                </button>
                <div className="search-field d-none d-md-block">
                    <form className="d-flex align-items-center h-100" action="#">
                        <div className="input-group">
                            <div className="input-group-prepend bg-transparent">
                                <i className="input-group-text border-0 mdi mdi-magnify" />
                            </div>
                            <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects" />
                        </div>
                    </form>
                </div>
                <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item nav-profile dropdown">
                        <Link className="nav-link dropdown-toggle" id="profileDropdown" to="/" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="nav-profile-img">
                                <img src={Avichal} alt="avatar" />
                                <span className="availability-status online" />
                            </div>
                            <div className="nav-profile-text">
                                <p className="mb-1 text-black">Avichal Kaushik</p>
                            </div>
                        </Link>
                        <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                            <Link className="dropdown-item" to="/">
                                <i className="mdi mdi-cached me-2 text-success" /> Activity Log </Link>
                            <div className="dropdown-divider" />
                            <Link className="dropdown-item" to="/">
                                <i className="mdi mdi-logout me-2 text-primary" /> Signout </Link>
                        </div>
                    </li>
                    <li className="nav-item d-none d-lg-block full-screen-link">
                        <Link to='/' className="nav-link">
                            <i className="mdi mdi-fullscreen" id="fullscreen-button" />
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to='/' className="nav-link count-indicator dropdown-toggle" id="messageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="mdi mdi-email-outline" />
                            <span className="count-symbol bg-warning" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                            <h6 className="p-3 mb-0">Messages</h6>
                            <div className="dropdown-divider" />
                            <div className="dropdown-divider" />
                            <h6 className="p-3 mb-0 text-center">4 new messages</h6>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="/" className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" data-bs-toggle="dropdown">
                            <i className="mdi mdi-bell-outline" />
                            <span className="count-symbol bg-danger" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                            <h6 className="p-3 mb-0">Notifications</h6>
                            <div className="dropdown-divider" />
                            <Link to='/' className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-success">
                                        <i className="mdi mdi-calendar" />
                                    </div>
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject font-weight-normal mb-1">Event today</h6>
                                    <p className="text-gray ellipsis mb-0"> Just a reminder that you have an event today </p>
                                </div>
                            </Link>
                            <div className="dropdown-divider" />
                            <Link to='/' className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-warning">
                                        <i className="mdi mdi-settings" />
                                    </div>
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject font-weight-normal mb-1">Settings</h6>
                                    <p className="text-gray ellipsis mb-0"> Update dashboard </p>
                                </div>
                            </Link>
                            <div className="dropdown-divider" />
                            <Link to='/' className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-info">
                                        <i className="mdi mdi-link-variant" />
                                    </div>
                                </div>
                                <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                    <h6 className="preview-subject font-weight-normal mb-1">Launch Admin</h6>
                                    <p className="text-gray ellipsis mb-0"> New admin wow! </p>
                                </div>
                            </Link>
                            <div className="dropdown-divider" />
                            <h6 className="p-3 mb-0 text-center">See all notifications</h6>
                        </div>
                    </li>
                    <li className="nav-item nav-logout d-none d-lg-block">
                        <Link className="nav-link" to="/">
                            <i className="mdi mdi-power" />
                        </Link>
                    </li>
                    <li className="nav-item nav-settings d-none d-lg-block">
                        <Link className="nav-link" to="/">
                            <i className="mdi mdi-format-line-spacing" />
                        </Link>
                    </li>
                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <span className="mdi mdi-menu" />
                </button>
            </div>
        </div>
    )
}

export default Header