import React from 'react';
import '../../css/eachBlogDisplay.css';
import HeaderDB from '../HeaderDB';

import createHistory from 'history/createBrowserHistory';
const history = createHistory();

export default class EachBlogDisplay extends React.Component{

    state = {
        openRemoveDialogBox: false,
    }

    removeButtonHandler = () => {
        this.setState({ openRemoveDialogBox: true });
    }

    handleClose = () => {
        this.setState({ openRemoveDialogBox: false })   
    }

    YesForRemoveHandler = () => {
        let id = this.props.id;
        let uid = this.props.uid;
        this.props.removeBlogAction(id, uid);
        this.setState({ openRemoveDialogBox: false }) 
    }

    buttonHandlerToUnpublished = () => {
        let uid = this.props.uid;
        let id = this.props.id;
        let title = this.props.title;
        let content = this.props.content;
        let image = this.props.image;
        let user = this.props.user;
        let date = this.props.date;
        let status = "saved";
        this.props.updateBlogFirebase(uid, id, title, content, status, image, date, user);
    }

    componentWillMount = () => {
        let blog = this.props.blogDisplayInfo;
        function isEmpty(param){
            for(let key in param){
                if(param.hasOwnProperty(key))
                return true
            }
            return false;
        }

        if(isEmpty(blog) !== true){
            console.log("empty");
            history.goBack();
        }
    }
    render(){
        const {blogDisplayInfo} = this.props;
        const title =  blogDisplayInfo.title;
        const content = blogDisplayInfo.content;
        const image = blogDisplayInfo.image;
        const date = blogDisplayInfo.date;
        const user = blogDisplayInfo.userName;
        // console.log(blogDisplayInfo.length);
        return(
            <div>
                <HeaderDB/>
                <div className="card">
                    <div className="title-div">
                        <h3>{title}</h3>
                        <h6>
                            <span className="user-span">By: {user}</span>
                            <span>{date}</span>
                        </h6>
                    </div>
                    <div className="image">
                        <img src={image} alt="blog-image" className="blog-image"/>
                    </div>
                    <div className="content-div">
                        {content}
                        <div className="greeting">
                             Namaste!
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
};