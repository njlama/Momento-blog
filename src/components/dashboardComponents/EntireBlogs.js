import React from 'react';
import firebase from 'firebase';
import { database, dbBlogs } from '../../config';
import EachDashBoardBlog from './EachDashBoardBlog';
import GridList from '@material-ui/core/GridList';
import MainPageEachBlog from './MainPageEachBlog';

export default class EntireBlog extends React.Component {

    state = {
        entireBlog : [],
        isUserPresent: false,
    }

    componentWillMount = () => {
        // Pull all blogs from all users 
        dbBlogs.on('value', function (snapshot) {         
            for(let i in snapshot.val()){
                for(let j in snapshot.val()[i]){
                    if(snapshot.val()[i][j].status === "published"){
                        let blog = {};
                        let blogTitle = snapshot.val()[i][j].title;  
                        let blogContent = snapshot.val()[i][j].content;
                        let blogImage = snapshot.val()[i][j].image;
                        let blogDate = snapshot.val()[i][j].date;
                        let blogUserName = snapshot.val()[i][j].userName;
                        blog.title = blogTitle;
                        blog.content = blogContent;
                        blog.image = blogImage;
                        blog.date = blogDate;
                        blog.userName = blogUserName;
                        this.setState({
                            entireBlog: [...this.state.entireBlog, blog]
                        })
                    }    
                }
            }
        }.bind(this));

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    isUserPresent: true
                })
            } else {
                this.setState({
                    isUserPresent: false
                })
            }
        })
    }

    render(){
        let mBlog;
        if(this.state.isUserPresent){
            mBlog = this.state.entireBlog.map((blog, index)=> {
            return <EachDashBoardBlog title={blog.title} 
                    content={blog.content}
                    image={blog.image}
                    date={blog.date}
                    user={blog.userName}
                    dataDisplay={this.props.dataDisplay}/>
            });
        } else {
            mBlog = this.state.entireBlog.map((blog, index)=> {
                return <MainPageEachBlog title={blog.title} 
                        content={blog.content}
                        image={blog.image}
                        date={blog.date}
                        user={blog.userName}
                        dataDisplay={this.props.dataDisplay}/>
            });
        }
        return(
            <GridList cellHeight={160} cols={3}>
                        { mBlog }
            </GridList>
        );
    }
}