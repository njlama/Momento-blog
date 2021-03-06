import React from 'react';

import Button from '@material-ui/core/Button';
import uniqid from 'uniqid';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import stripTags from 'striptags';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/createNewBlog.css';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import CardMedia from '@material-ui/core/CardMedia';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LinearProgress from '@material-ui/core/LinearProgress';

import firebase from 'firebase';
import { database, dbAccounts, storage } from '../config';

import createHistory from 'history/createBrowserHistory';
import ArrowNavToDashboard from './ArrowNavToDashboard';

const history = createHistory();

class CreateNewBlog extends React.Component {

    state = {
        editorState: null, 
        titleValue: "", 
        openSnackBar: false,
        openSnackBarForBlogUpload: false,

        image: null, 
        url: null,
        progress: 0,

        userName: "",
        userEmail: "",
    }

    titleOnChangeHandler = (e) => {
        this.setState({
            titleValue: e.target.value
        })
    }

    onEditorStateChange = (event) => {
       
        let editorSourceHTML = draftToHtml(convertToRaw(event.getCurrentContent()));
        // let mSourceHTML = stripTags(editorSourceHTML);
        // let nSourceHTML = mSourceHTML.replace(/&nbsp;/gi, "");
        
        // nSourceHTML = nSourceHTML.trim();
        // this.setState({
        //     editorState: nSourceHTML,
        // })
        let rawValue = convertToRaw(event.getCurrentContent());
        let value = rawValue.blocks[0].text;
        this.setState({
            editorState: value,
        })
    }

    /** func for empty input field  */
    inputErrorDisplay = () => {
        if ( this.state.titleValue !== "" && this.state.editorState !== "" && this.state.editorState !== null && this.state.editorState !== ""){
           
        } else {
                this.setState({ openSnackBar: true})
            }    
    }

    /** Uploading image for blog */

    chooseImageHandler = (e) => {
            this.setState({
                image: e.target.files[0]
            })
        
    }

    uploadButtonHandler = () => {
        let uniqID = uniqid();
        const image = this.state.image;
        if(image !== null & image !== ""){
            const uploadTask = storage.child(uniqID + image.name).put(image);
    
            // state_changed event takes 3 arguments: progress, error, complete
            uploadTask.on('state_changed',
                 (snapshot) => {
                     // progress function
                    var mProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
                    this.setState({ progress: mProgress}) 
                 },
                 (error) => {
                     // error function
                     console.log(error)
                 },
                () => {
                    // complete function. Handles sucessful uploads on complete
                    storage.child(uniqID +image.name).getDownloadURL().then(downloadURL =>{
                        console.log(downloadURL);
                        this.setState({
                            url: downloadURL,
                        });
                    });   
                }
            )
        }
    }

    /** getting user.uid */
    getUserUID = () => {
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null){
            uid = user.uid
        }
        return uid;
    }

    publishButton = (param, event) => {
        this.inputErrorDisplay();
        var uid = this.getUserUID();
        let titleValue = this.state.titleValue;
        let content = this.state.editorState;
        let image = this.state.url;
        let date = this.getDate();

        let userName; 
        if(this.state.userName){
            userName = this.state.userName;
        } else {
            userName = this.state.userEmail
        }
        console.log(content)
        let url = typeof image;
        if(url === "string"){
            if(titleValue !== ""  && content !== "" && titleValue !== null && content !== null){
                this.props.addPublishedBlog(uid, titleValue, content, image, date, userName);
                this.setState({ openSnackBarForBlogUpload: true});
                // history.push('/publishedblogs')
                window.location.reload();
            } else {
                this.setState({ openSnackBar: true})
            }
        } else {
            this.setState({ openSnackBar: true})
        }
        
    }

    saveButton = () => {
        this.inputErrorDisplay();
        var uid = this.getUserUID();
        let titleValue = this.state.titleValue;
        let content = this.state.editorState;
        let image = this.state.url;
        let date = this.getDate();

        let userName; 
        if(this.state.userName){
            userName = this.state.userName;
        } else {
            userName = this.state.userEmail
        }
        console.log(content)

        let url = typeof image;
        if(url === "string"){
            if(titleValue !== ""  && content !== "" && titleValue !== null && content !== null){
                this.props.addSavedBlog(uid, titleValue, content, image, date, userName);
                this.setState({ openSnackBarForBlogUpload: true});
                // history.push("/unpublishedblogs");
                window.location.reload();
            } else {
                this.setState({ openSnackBar: true})
            }
        } else {
            this.setState({ openSnackBar: true})
        }
    }

    /** Error display */
    handleSnackbarClose = (event, reason) => {
        if ( reason === "clickaway"){
            return;
        }   
        this.setState({ openSnackBar: false})
    }

    handleBlogSnackbarClose = (event, reason) => {
        if ( reason === "clickaway"){
            return;
        }   
        this.setState({ openSnackBarForBlogUpload: false})
    }

    getDate = () => {
        let date = new Date().toLocaleDateString()
        return date;
    }

    /** Getting userEmail and name */
    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                this.setState({ 
                    userEmail: user.email
                });
                dbAccounts.child(user.uid).on('value', (snapShot)=>{
                    this.setState({
                        userName: snapShot.val().name
                    })
                });
            }  
        }.bind(this));
    }

    render(){
       
        return(
            <div>
                <ArrowNavToDashboard/>
                <div className="blogEditor">
                    <TextField
                        label="Title"
                        margin="normal"
                        className="blogTitle"
                        onChange={this.titleOnChangeHandler.bind(this)}
                        fullWidth />
                    <br/>
                    <div>
                        <CardMedia
                            image={ this.state.url}
                            className="image-div picture-div"
                        />
                        <LinearProgress variant="determinate"
                             value={this.state.progress} 
                             className="progress"/>
                        <form className="imageforNewBlog">
                            <Button variant="contained" 
                                onClick={this.uploadButtonHandler.bind(this)}>
                                <input type="file" multiple accept="image/*"
                                    onChange={this.chooseImageHandler.bind(this)}/>
                                <CloudUploadIcon/>
                            </Button>
                        </form> 
                    </div>
                    <Editor
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        EditorState={this.state.editorState}
                        onEditorStateChange={this.onEditorStateChange.bind(this)}
                        />

                        <div className="buttonDiv">
                            <Button variant="outlined" 
                                color="secondary"
                                onClick={this.saveButton.bind(this, this.state.editorState)}
                                className="saveButton">
                                Save
                            </Button>
                            <Button variant="outlined" 
                                color="secondary"
                                className="publishButton"
                                onClick={this.publishButton.bind(this, this.state.editorState)}>
                                Publish
                            </Button>
                        </div>

                        {/* snackbar */}

                        {/* snackbar for empty input field  */}
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.openSnackBar}
                            autoHideDuration={3000}
                            onClose={this.handleSnackbarClose.bind(this)}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">All fields are required!</span>}
                            />

                        {/* snackbar for published/saved blog  */}
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.openSnackBarForBlogUpload}
                            autoHideDuration={3000}
                            onClose={this.handleBlogSnackbarClose.bind(this)}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Blog is uploaded!</span>}
                            />

                </div>
            </div>
        );
    }
}

export default (CreateNewBlog);         