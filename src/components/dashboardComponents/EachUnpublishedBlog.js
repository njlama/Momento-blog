import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { NavLink } from 'react-router-dom';
import Truncate from 'react-truncate'
import CardHeader from '@material-ui/core/CardHeader';
// import '../../css/blog.css';
import '../../css/eachPublishedBlog.css';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();


export default class EachUnpublishedBlog extends React.Component{

    state = {
        openRemoveDialogBox: false,
        openUnpublishedToPublish: false,
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

    editHandler = () => {
        let id= this.props.id;
        let title = this.props.title;
        let content = this.props.content;
        let image = this.props.image;
        let user = this.props.user;
        let date = new Date().toLocaleDateString();
        this.props.updateUnpublishedBlog(title, content, id, image, date, user);
    }

    editStatusToPublished = () => {
        this.setState({ openUnpublishedToPublish: true });
        let uid = this.props.uid;
        let id = this.props.id;
        let title = this.props.title;
        let content = this.props.content;
        let image = this.props.image;
        let user = this.props.user;
        let date = new Date().toLocaleDateString();
        let status = "published";
        this.props.updateBlogFirebase(uid, id, title, content, status, image, date, user);
    }

    

    handleCloseForUnpublishedToPublish = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ openUnpublishedToPublish: false });
    };

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
                    <CardActionArea className="content-area"
                        onClick={this.expandContentAreaHandler.bind(this)}>
                        <CardContent>
                            <Typography>
                                <NavLink to="/dashboard/blog-display" className="blog-display">
                                    <Truncate lines={3} ellipsis={<span>...<a>Read More</a></span>}>
                                        {content}
                                        Edit
                                    </Truncate>
                                </NavLink>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                <div className="cardButtonArea">
                    <CardActions>
                        <Button size="small" color="primary"
                            onClick={this.editHandler.bind(this)}> 
                            <NavLink to="/unpublishedBlog/update-blog">Edit</NavLink>
                        </Button>
                        <Button size="small" color="primary"
                                onClick={this.removeButtonHandler.bind(this)}>
                            Remove
                        </Button>
                        <Button size="small" color="primary"
                                onClick={this.editStatusToPublished.bind(this)}>
                            Publish
                        </Button>
                    </CardActions>
                </div>
                </Card>

                <div>
                    {/* Remove dialog box */}
                    <Dialog
                        open={this.state.openRemoveDialogBox}
                        onClose={this.handleClose.bind(this)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="logoutDialog">
                        <DialogTitle id="alert-dialog-title">
                            Are sure you want to remove blog?
                        </DialogTitle>

                        <DialogActions className="logoutDialogButtons">
                            <Button onClick={this.YesForRemoveHandler.bind(this)} color="primary">
                                Yes
                            </Button>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>

                {/* Sucess Snack Bar to confirm unpublished Blog to published Blog  */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openUnpublishedToPublish}
                    autoHideDuration={6000}
                    onClose={this.handleCloseForUnpublishedToPublish}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Your blog is published</span>}
                    />
                </div>
            </div>
        );
    }
};