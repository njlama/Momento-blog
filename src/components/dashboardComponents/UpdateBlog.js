import React from 'react';

import Button from '@material-ui/core/Button';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState,
         convertFromHTML, createWithContent, createFromText,
            createFromBlockArray, processHTML, getCurrentContent } from 'draft-js';
// import stripTags from 'striptags';
// import Draft from 'draft-js';
// import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../css/createNewBlog.css';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import Snackbar from '@material-ui/core/Snackbar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LinearProgress from '@material-ui/core/LinearProgress';
import firebase from 'firebase';
import { database, dbBlogs, storage } from '../../config';

import createHistory from 'history/createBrowserHistory';
import ArrowNavToDashboard from '../ArrowNavToDashboard';

const history = createHistory();

class UpdateBlog extends React.Component {


    constructor(props){
        super(props);
        let editorState;

        if (this.props.updateInfo.content) {
            const blocksFromHTML = convertFromHTML(this.props.updateInfo.content);
            const contentState = ContentState.createFromBlockArray(blocksFromHTML);
            editorState = EditorState.createWithContent(contentState);
        }
        else {
            editorState = EditorState.createEmpty();
        }

        // this.state = { editorState };
        this.state = {
            editorState: editorState,
            editorValue: "",
            titleValue: this.props.updateInfo.title, 
            image: this.props.updateInfo.image,
            // imageProgressbar: 0,
            openSnackBar: false,
            progress: 0,
            openSnackBarForBlogUpload: false, 
        }
    }
    

    titleOnChangeHandler = (e) => {
        this.setState({
            titleValue: e.target.value
        })
    }

    handleChange = editorState => {
        let content = convertToHTML(editorState.getCurrentContent());
        // console.log(convertToRaw(content));
        let rawValue = convertToRaw(editorState.getCurrentContent());
        let value = rawValue.blocks[0].text;
        this.setState({ editorValue: value}) 
        // let mEditorValue = stripTags(content);
        // let nEditorValue = mEditorValue.replace(/&nbsp;/gi, "");
        // this.setState({ editorValue: nEditorValue})   
    }

    /** Uploading image for blog */

    chooseImageHandler = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    uploadButtonHandler = () => {
        const image = this.state.image;
        if(image !== null & image !== ""){
            const uploadTask = storage.child(image.name).put(image);
            // state_changed event takes 3 arguments: progress, error, complete
            uploadTask.on('state_changed',
                 (snapshot) => {
                     // progress function
                    var mProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.setState({ progress: mProgress})   
                },
                (error) => {console.log(error)},
                () => {
                    // complete function. Handles sucessful uploads on complete
                    storage.child(image.name).getDownloadURL().then(downloadURL =>{
                        this.setState({
                            image: downloadURL
                        });
                    });
            });
        };
    };

    publishButton = (param, event) => {
        let uid = this.getUserUID();
        let blogID = this.props.updateInfo.id;
        let title = this.state.titleValue;
        let content = this.state.editorValue;
        let user = this.props.updateInfo.userName;
        let date = new Date().toLocaleDateString();
        let url = this.state.image;
        if ( content === ""){
            content = this.props.updateInfo.content
        };
        let state = "published";
        let mImage = typeof this.state.image;
        if(mImage === "string"){
            if(title !== "" && content !== "" && title !== null && content !== null){
                this.props.updateBlog(uid, blogID, title, content, state, url, date, user);
                this.setState({ openSnackBarForBlogUpload: true})
                history.push("/publishedblogs");
                window.location.reload();
            } else {
                this.setState({ openSnackBar: true});
            }
        } else {
            this.setState({ openSnackBar: true});
        }       
    }

    saveButton = () => {
        let uid = this.getUserUID();
        let blogID = this.props.updateInfo.id;
        let title = this.state.titleValue;
        let content = this.state.editorValue;

        let url = this.state.image;
        let state = "saved"
        if ( content === ""){
            content = this.props.updateInfo.content
        }
        let mImage = typeof this.state.image;

        let date = new Date().toLocaleDateString();
        let user = this.props.updateInfo.userName;
        if(mImage === "string"){
            if(title !== "" && content !== "" && title !== null && content !== null){
                this.props.updateBlog(uid, blogID, title, content, state, url, date, user);
                this.setState({ openSnackBarForBlogUpload: true})
                history.push("/unpublishedBlog");
                window.location.reload();
            } else {
                this.setState({ openSnackBar: true});
            }
        } else {
            this.setState({ openSnackBar: true});
        } 
    }

    /** func to check empty input field  */
    inputErrorDisplay = (param, event) => {
        if ( this.state.titleValue.trim() !== "" && param.trim() !== ""){
            console.log("You got both values")
        } else {
            console.log("both field are required");
            this.setState({ openSnackBar: true})
        };
    }

    /** getting user.uid */
    getUserUID = () => {
        let user = firebase.auth().currentUser;
        let uid;
        if (user != null){
            uid = user.uid
        }
        return uid;
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

    render(){
        return(
            <div>
                <ArrowNavToDashboard/>
                <div className="blogEditor">
                    <TextField
                        label="Title"
                        margin="normal"
                        fullWidth
                        className="blogTitle"
                        value={this.state.titleValue}
                        onChange={this.titleOnChangeHandler.bind(this)}/>
                    <CardMedia
                        image={this.state.image}
                        className="image-div"
                        />
                    <LinearProgress variant="determinate"
                             value={this.state.progress} 
                             className="progress"/>
                    <form className="imageforNewBlog">
                        <Button variant="contained" 
                            onClick={this.uploadButtonHandler.bind(this)}>
                            <input type="file" onChange={this.chooseImageHandler.bind(this)}/>
                            <CloudUploadIcon/>
                        </Button>
                    </form> 

                    <Editor
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        defaultEditorState={this.state.editorState}
                        onEditorStateChange={this.handleChange.bind(this)}
                        autoFocus
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

export default (UpdateBlog);         