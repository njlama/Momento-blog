import React from 'react';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import '../App.css';
import '../css/aboutUs.css';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export default class AboutUs extends React.Component{

    signinHandler = () => {
        history.push('/signin-login');
        window.location.reload();
    }

    render(){
        return(
            <div className="main-div"> 
                <div className="header-signup ">
                    <div className="getStartedDiv mainDiv-aboutUs">
                            <header className="aboutUs-header">
                                <div className="nav-bar">
                                    <div className="left-navbar about-left">
                                        <span style={{ color: "white"}}
                                            onClick={()=>{ history.push('/'); window.location.reload();}}>Memento</span>
                                    </div>
                                    <div className="right-navbar about-right">
                                        <span style={{ color: "white"}}
                                            onClick={this.signinHandler.bind(this)}>Sign In</span>
                                    </div>
                                </div>
                            </header>

                            <div className="msg">
                                <span>About us</span>
                                <p>Helping one's idea sucess.</p>
                            </div>
                    </div>

                    <div className="aboutUs-content">
                        <h3 className="aboutUs-contentH3">Your Blog and You</h3>
                        <p  className="aboutUs-contentP">This is where dreams becomes reality. You let your-self grow with your dream and inspire other people.</p>
                    </div>

                    <div className="footer">
                        <div className="aboutus-div">
                            <NavLink to="/main-page/about-us" >About us</NavLink>
                        </div>

                        <div className="developer-div">
                            <NavLink to="/main-page/about-developer">Developer</NavLink>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}