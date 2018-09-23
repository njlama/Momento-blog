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
import '../../css/blog.css';


export default class EachDashBoardBlog extends React.Component{

    // state = {
    //     openRemoveDialogBox: false,
    // }

    // removeButtonHandler = () => {
    //     this.setState({ openRemoveDialogBox: true });
    // }

    // handleClose = () => {
    //     this.setState({ openRemoveDialogBox: false })   
    // }

    // YesForRemoveHandler = () => {
    //     let id = this.props.id;
    //     let uid = this.props.uid;
    //     this.props.removeBlogAction(id, uid);
    //     this.setState({ openRemoveDialogBox: false }) 
    // }

    render(){
        const { title, content } = this.props;
        return(
            <div className="cardDiv">
                <Card>
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
                            <Typography component="p">
                            {content}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </div>
                {/* <div className="cardButtonArea">
                    <CardActions>
                        <Button size="small" color="primary"
                                onClick={this.removeButtonHandler.bind(this)}>
                            Remove
                        </Button>
                    </CardActions>
                </div> */}
                </Card>
            </div>
        );
    }
};  