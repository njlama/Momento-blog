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
import CardHeader from '@material-ui/core/CardHeader';
import Truncate from 'react-truncate';
// import '../../css/blog.css';
import '../../css/eachPublishedBlog.css';


export default class EachPublishedBlog extends React.Component{

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

    expandContentAreaHandler = () => {
        console.log("your page is comming soon");
        
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
                                <Truncate lines={3} ellipsis={<span>...<a>Read More</a></span>}>
                                    {content}
                                </Truncate>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <div className="cardButtonArea">
                        <CardActions>
                            <Button size="small" color="primary"
                                    onClick={this.removeButtonHandler.bind(this)}>
                                Remove
                            </Button>
                            <Button size="small" color="primary"
                                    onClick={this.buttonHandlerToUnpublished.bind(this)}>
                                Unpublish
                            </Button>
                        </CardActions>
                    </div>

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
                    </div>
                </Card>
            </div>
        );
    }
};  

{/* <Card>
                <div className="cardActionArea">
                <CardHeader
                    title={title}
                    // subheader="September 14, 2016"
                    />
                    <CardActionArea>
                        {/* Image goes here */}
                        // <CardMedia
                        //     image={image}
                        //     title="Family"
                        //     height="140"
                        // />
                        // <CardContent>
                            {/* <Typography gutterBottom variant="headline" component="h2">
                            {title}
                            </Typography> */}
                //             <Typography component="p">
                //                 <Truncate lines={3} ellipsis={<span>...<a>Read More</a></span>}>
                //                     {content}
                //                 </Truncate>
                //             </Typography>
                //         </CardContent>
                //     </CardActionArea>
                // </div>
                // <div className="cardButtonArea">
                //     <CardActions>
                //         <Button size="small" color="primary"
                //                 onClick={this.removeButtonHandler.bind(this)}>
                //             Remove
                //         </Button>
                //         <Button size="small" color="primary"
                //                 onClick={this.buttonHandlerToUnpublished.bind(this)}>
                //             Unpublish
                //         </Button>
                //     </CardActions>
                // </div>
                // </Card>
                // <div>
                    {/* Remove dialog box */}
                // <Dialog
                //     open={this.state.openRemoveDialogBox}
                //     onClose={this.handleClose.bind(this)}
                //     aria-labelledby="alert-dialog-title"
                //     aria-describedby="alert-dialog-description"
                //     className="logoutDialog">
                //     <DialogTitle id="alert-dialog-title">
                //         Are sure you want to remove blog?
                //     </DialogTitle>

                //     <DialogActions className="logoutDialogButtons">
                //         <Button onClick={this.YesForRemoveHandler.bind(this)} color="primary">
                //             Yes
                //         </Button>
                //         <Button onClick={this.handleClose} color="primary" autoFocus>
                //             No
                //         </Button>
                //     </DialogActions>
                // </Dialog>
                // </div>