import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Truncate from 'react-truncate'

import '../../css/blog.css';
import '../../css/eachPublishedBlog.css';


export default class EachDashBoardBlog extends React.Component{


    expandContentAreaHandler = () => {
        console.log("your page is comming soon")
    }
    
    render(){
        const { title, content, image, date, user } = this.props;
        return(
            <div className="cardDiv">
                <Card className="card-padding">
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
                                <Typography component="p" className="content-paragraph">
                                    <Truncate lines={3} 
                                        ellipsis={<span>. . . <a>Read More</a></span>}>
                                        {content}
                                    </Truncate>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </div>
                </Card>
            </div>
        );
    }
};  