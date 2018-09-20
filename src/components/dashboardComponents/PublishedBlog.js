import React from 'react';
// import EachPost from '../EachPost';
import firebase from 'firebase';

import createHistory from 'history/createBrowserHistory';
import HeaderDB from '../HeaderDB';
import ArrowNavToDashboard from '../ArrowNavToDashboard';
import GridList from '@material-ui/core/GridList';
import EachPublishedBlog from './EachPublishedBlog';

const history = createHistory();

export default class PublishedBlog extends React.Component {

    render(){
        let blogPost;
        let user = firebase.auth().currentUser;
        if(user){
            blogPost = this.props.blogs
                .map((eachBlog, index) => {
                    if( eachBlog.status === "published"){
                       return <EachPublishedBlog key={index} 
                                        title={eachBlog.title}
                                        id={eachBlog.id}
                                        content={eachBlog.content}
                                        uid={this.props.uid}
                                        removeBlogAction={this.props.removeBlog}/> 
                    }         
                });
        };
        
        return(
            <div>
                <HeaderDB/>
                
                <div className="blogs-header">
                    <ArrowNavToDashboard/>
                    <h3>My Published Blogs</h3>
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

