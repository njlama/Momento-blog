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
                                        image={eachBlog.image}
                                        uid={this.props.uid}
                                        date={eachBlog.date}
                                        user={eachBlog.userName}
                                        dataDisplay={this.props.dataDisplay}
                                        removeBlogAction={this.props.removeBlog}
                                        updateBlogFirebase={this.props.updateBlogFirebase}/> 
                    }         
                });
        };
        
        return(
            <div>
                <HeaderDB/>
                <div className="blogs-header">
                    <ArrowNavToDashboard/>
                    <h2>My Published Blogs</h2>
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

