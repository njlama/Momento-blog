import React from 'react';
import firebase from 'firebase';
import { database, dbBlogs } from '../../config';
import EachDashBoardBlog from './EachDashBoardBlog';
import GridList from '@material-ui/core/GridList';

export default class EntireBlog extends React.Component {

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
            <GridList cellHeight={160} cols={3}>
                        { mBlog }
            </GridList>
        );
    }
}