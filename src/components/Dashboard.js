import React from 'react';
import HeaderDB from './HeaderDB';
import firebase from 'firebase';
import { database, dbBlogs } from '../config';

import Button from '@material-ui/core/Button';
import '../css/dashBoard.css';
import createHistory from 'history/createBrowserHistory';
import EachDashBoardBlog from './dashboardComponents/EachDashBoardBlog';
import GridList from '@material-ui/core/GridList';
const history = createHistory();


class Dashboard extends React.Component {

    state = {
        entireBlog : []
    }

    componentWillMount = () => {
        dbBlogs.on('value', function (snapshot) {         
            for(let i in snapshot.val()){
                for(let j in snapshot.val()[i]){

                    if(snapshot.val()[i][j].status === "published"){
                        let blog = {};
                        let blogTitle = snapshot.val()[i][j].title;  
                        let blogContent = snapshot.val()[i][j].content;
                        blog.title = blogTitle;
                        blog.content = blogContent;
                        this.setState({
                            entireBlog: [...this.state.entireBlog, blog]
                        })
                    }

                    
                }
            }
        }.bind(this));
    }
    render(){
        let mBlog = this.state.entireBlog.map((blog, index)=> {
            return <EachDashBoardBlog title={blog.title} content={blog.content}/>
        })
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
                    <GridList cellHeight={160} cols={3}>
                        { mBlog }
                    </GridList>
                </div>
                
            </div>
        );
    }
}

export default (Dashboard);