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
const history = createHistory();


class Dashboard extends React.Component {



    render(){
        return(
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
                    <EntireBlog/>
                    {/* <GridList cellHeight={160} cols={3}>
                        { mBlog }
                    </GridList> */}
                </div>
                
            </div>
        );
    }
}

export default (Dashboard);