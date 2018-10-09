import React from 'react';
import '../../css/eachBlogDisplay.css';
import HeaderDB from '../HeaderDB';

import createHistory from 'history/createBrowserHistory';
const history = createHistory();

export default class EachBlogDisplay extends React.Component{

    componentWillMount = () => {
        let blog = this.props.blogDisplayInfo;
        function isEmpty(param){
            for(let key in param){
                if(param.hasOwnProperty(key))
                return true
            }
            return false;
        }

        if(isEmpty(blog) === false){
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