import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Truncate from 'react-truncate';
import { NavLink } from 'react-router-dom';

import '../../css/blog.css';
import '../../css/eachPublishedBlog.css';


export default class MainPageEachBlog extends React.Component{

    state = {
        open: false
    }
    
    displayModelHandler = () => {
        console.log("clicked");
        this.setState({ open: true})
    }

    handleClose = () => {
        this.setState({ open: false });
    };

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
                            onClick={this.displayModelHandler.bind(this)}>
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

                {/* Dialog box */}

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog-mainPage"
                    >
                    <div className="size-dialog-box">
                    <div className="size-box">
                        <DialogTitle id="alert-dialog-title">
                            {" Log in to see more "}
                        </DialogTitle>
                        <DialogContent className="dialog-p">
                            <DialogContentText id="alert-dialog-description">
                            Many instresting blogs await for you to be read
                            </DialogContentText>
                        </DialogContent>
                        <div className="dialog-button">
                            <Button color="primary" autoFocus>
                                <NavLink to="/signin-login">Sign Up</NavLink>
                            </Button>
                        </div>
                    </div>
                    </div>
                </Dialog>
            </div>
        );
    }
};  