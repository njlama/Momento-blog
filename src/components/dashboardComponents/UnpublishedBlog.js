import React from 'react';
import EachPost from '../EachPost';
import firebase from 'firebase';

import { Grid } from 'react-bootstrap';
import createHistory from 'history/createBrowserHistory';
import HeaderDB from '../HeaderDB';
import ArrowNavToDashboard from '../ArrowNavToDashboard';
import GridList from '@material-ui/core/GridList';
import EachUnpublishedBlog from './EachUnpublishedBlog';

const history = createHistory();

export default class UnpublishedBlog extends React.Component {

    render(){
        let blogPost;
        let user = firebase.auth().currentUser;
        if(user){
            blogPost = this.props.blogs
                .map((eachBlog, index) => {
                    if( eachBlog.status === "saved"){
                       return <EachUnpublishedBlog key={index} 
                                        id={eachBlog.id}
                                        title={eachBlog.title}
                                        status={eachBlog.status}
                                        content={eachBlog.content}
                                        uid={this.props.uid}
                                        removeBlogAction={this.props.removeBlog}
                                        updateUnpublishedBlog={this.props.updateUnpublishedBlog}
                                        updateBlogFirebase={this.props.updateBlogFirebase}/> 
                    }
                    
                });
        }
        
        return(
            <div>
                <HeaderDB/>
                <div className="blogs-header">
                    <ArrowNavToDashboard/>
                    <h2>Unpublished Blogs</h2>
                </div>
               <div className="blogDisplayDiv">
                    <GridList cellHeight={160} cols={3}>
                        
                        { blogPost }
                    </GridList>
                </div>       
            </div>
        );
    }
}