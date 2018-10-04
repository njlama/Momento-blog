import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Truncate from 'react-truncate';
import { NavLink } from 'react-router-dom';

import '../../css/blog.css';
import '../../css/eachPublishedBlog.css';


export default class EachDashBoardBlog extends React.Component{


    expandContentAreaHandler = () => {
        let id= this.props.id;
        let title = this.props.title;
        let user = this.props.user;
        let date = this.props.date;
        let image = this.props.image;
        let content = this.props.content;
        this.props.dataDisplay(title, content, id, image, date, user);
    }
    
    render(){
        const { title, content, image, date, user } = this.props;
        return(
            <div className="cardDiv">
                <Card className="card-padding" style={{height: "453px"}}>
                    <CardHeader
                        title={title}
                        className="cardHeader-title"
                        />
                    <div className="blog-userDate-display">
                        <span>By {user}</span>
                        <span>{date}</span>
                    </div>
                    <CardMedia
                        image={image}
                        className="image-div"
                        />
                    <div className="cardActionArea">
                        <CardActionArea className="content-area"
                            onClick={this.expandContentAreaHandler.bind(this)}>
                            <CardContent>
                            <NavLink to="/dashboard/blog-display" className="blog-display">
                                <Typography component="p" className="content-paragraph">
                                    <Truncate lines={3} 
                                        ellipsis={<span>. . . <a>Read More</a></span>}>
                                        {content}
                                    </Truncate>
                                </Typography>
                            </NavLink>
                            </CardContent>
                        </CardActionArea>
                    </div>
                </Card>
            </div>
        );
    }
};  