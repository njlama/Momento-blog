import React from 'react';
import Header from './Header';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase';
import '../App.css';
import '../css/aboutUs.css';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export default class DeveloperFooter extends React.Component{

    state = {
        user: false,
        logout: false,
    }

    signinHandler = () => {
        history.push('/signin-login');
        window.location.reload();
    }

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                this.setState({ user: true});
                console.log("user present");
            } else {
                this.setState({ user: false});
                console.log("user not present");
            }
        })
    }

    /** Log out logic  */
    LogoutHandler = (e) => {
        this.setState({ logout: true })
    } 

    handleClose = () => {
        this.setState({ logout: false });
    };

    handleCloseYesButton = () => {
        this.setState({ logout: false });
        firebase.auth().signOut()
            .then(()=> {
            })
            .catch((error) => {
                console.log(error);
            })
    };

    signinHandler = () => {
        history.push('/signin-login');
        window.location.reload();
    }

    render(){
        let viewStyle={};
        let hideStyle={};

        if(this.state.user){
            viewStyle.display = "none";
        } else {
            hideStyle.display = "none";
        }
        return(
            <div className="main-div"> 
                <div className="header-signup ">
                    <div className="getStartedDiv mainDiv-aboutUs">
                            <header className="aboutUs-header">
                                <div className="nav-bar">
                                    <div className="left-navbar about-left">
                                    <span style={viewStyle}
                                            onClick={()=>{ history.push('/'); window.location.reload();}}>Memento</span>

                                        <span style={hideStyle}
                                            onClick={()=>{ history.push('/dashboard'); window.location.reload();}}>Dashboard</span>
                                    </div>
                                    <div className="right-navbar about-right">
                                    <span
                                            style={viewStyle}
                                            onClick={this.signinHandler.bind(this)}>Sign In</span>
                                        <span style={hideStyle}
                                            onClick={this.LogoutHandler.bind(this)}>Log Out</span>
                                    </div>
                                </div>
                            </header>

                            <div className="msg">
                                <span>About us</span>
                                <p>Helping one's idea sucess.</p>
                            </div>
                    </div>

                    <div className="aboutUs-content">
                        <h3 className="aboutUs-contentH3">Front-end Developer</h3>
                        <p  className="aboutUs-contentP">Hi there! This is NJ Lama, a self-taught front-end developer. 
                            Skilled on ReactJS Library, Router, Redux, HTML, CSS, Javascript, JQuery, Bootstrap, APIs, Firebase (NoSQL database). I have been working
                            on my personal projects to learn and enhance web development skills and knowledge. Before I started as a front-end developer, I was an Occupational Therapist and worked for a year.</p>
                    </div>

                    <div className="footer">
                        <div className="aboutus-div">
                            <NavLink to="/main-page/about-us" activeClassName="footer-selected">About us</NavLink>
                        </div>

                        <div className="developer-div">
                            <NavLink to="/main-page/about-developer" activeClassName="footer-selected">Developer</NavLink>
                        </div>
                    </div>
                </div>

                {/* logout dialog box */}
                <Dialog
                        open={this.state.logout}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="logoutDialog">
                        <DialogTitle id="alert-dialog-title">
                            Are you sure you want to logout?
                        </DialogTitle>
                        <DialogActions  className="logoutDialogButtons">
                            <Button onClick={this.handleCloseYesButton.bind(this)} 
                                    color="primary">
                            Yes
                            </Button>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                            No
                            </Button>
                        </DialogActions>
                    </Dialog>
            </div >
        );
    }
}