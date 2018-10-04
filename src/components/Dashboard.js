import React from 'react';
import HeaderDB from './HeaderDB';
import firebase from 'firebase';
import { database, dbBlogs } from '../config';

import Button from '@material-ui/core/Button';
import '../css/dashBoard.css';
import createHistory from 'history/createBrowserHistory';
import EachDashBoardBlog from './dashboardComponents/EachDashBoardBlog';
import GridList from '@material-ui/core/GridList';
import EntireBlog from './dashboardComponents/EntireBlogs';
import Footer from './Footer';
const history = createHistory();


class Dashboard extends React.Component {

    render(){      
        return(
            <div>
                <div className="dashboard-div">
                    <HeaderDB/>
                    <div className="createBlogDiv">
                        <p className="welcomeMsg">Create your blog and share it with the world.</p>
                        <Button variant="outlined" 
                                className="dbCreateBlog"
                                onClick={()=>{ history.push('/createNewBlog'); window.location.reload()}}>
                                Create a new blog
                        </Button>
                    </div>
                    <div className="dashboard-blogContent">
                        <EntireBlog dataDisplay={this.props.dataDisplay}/>
                    </div>    
                </div>
                <Footer/>
            </div>
        );
    }
}

export default (Dashboard);