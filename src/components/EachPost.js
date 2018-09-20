import React from 'react';
import '../css/eachPost.css';

export default class EachPost extends React.Component{

    postClickHandler = () => {
        console.log(this.props.id)
    }

    render(){
        const { title, author, date, content } = this.props;
        return(
                <div className="post"
                    onClick={this.postClickHandler.bind(this)}>
                    <h5 className="title">{title}</h5>
                    <p>{date}</p>
                    <p>By { author }</p>
                    <p className="blog-content">{content}</p>
                </div>
        );    
    }
    
}