import React from 'react';
import HeaderDB from './HeaderDB';
import firebase from 'firebase';
import { database, dbAccounts} from '../config';

import '../css/dashBoard.css';
import Button from '@material-ui/core/Button';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();


class Dashboard extends React.Component {


    render(){
        window.location.reload;
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
                </div>
                
            </div>
        );
    }
}

export default (Dashboard);