import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import ReadMoreReact from 'read-more-react';
import Truncate from 'react-truncate'

import '../../css/blog.css';


export default class EachDashBoardBlog extends React.Component{

    render(){
        const { title, content } = this.props;
        return(
            <div className="cardDiv">
                <Card className="card-padding">
                    <div className="cardActionArea">
                        <CardActionArea>
                            {/* Image goes here */}
                            {/* <CardMedia
                                title="Contemplative Reptile"
                            /> */}
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                {title}
                                </Typography>
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