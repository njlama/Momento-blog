import React from 'react';
// import BlogDemo from './BlogDemo';
import Header from './Header';

import { NavLink } from 'react-router-dom';
import firebase from 'firebase';
import '../css/mainPage.css';
import createHistory from 'history/createBrowserHistory';
import EntireBlog from './dashboardComponents/EntireBlogs';

const history = createHistory();

export default class HeaderSignup extends React.Component {

    componentWillMount = () => {
        const { dispatch } = this.props;
        firebase.auth().onAuthStateChanged((user) => {
          if(user){
            history.push("/dashboard");
            window.location.reload();
            console.log("user in App");
  
          } else {
            console.log("USer not present")
          }
        })
      }

    render(){
        return(
            <div>
            <div className="main-div">
                <div className="header-signup">
                    <Header/>
                    <div className="getStartedDiv">
                        <p>Create your inspiring and beautiful blog.</p>
                        <p className="getStarted">Get started, here!</p>
                        <NavLink to="/signin-login">Create your Blog</NavLink>
                    </div>
                </div>
                <div className="mainpage-blogDisplay">
                    <div className="dashboard-blogContent">
                        <EntireBlog/>
                    </div>
                </div>
            </div >
                <div className="footer">
                    <div>
                        <NavLink to="/main-page/about-us" >About us</NavLink>
                    </div>

                    <div>
                        <NavLink to="/main-page/about-developer" >Developer</NavLink>
                    </div>
                </div>
            </div>
        );
    }
} 