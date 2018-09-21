import React from 'react';

import Button from '@material-ui/core/Button';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState,
         convertFromHTML, createWithContent, createFromText,
            createFromBlockArray, processHTML, getCurrentContent } from 'draft-js';
import stripTags from 'striptags';
import Draft from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../css/createNewBlog.css';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import firebase from 'firebase';
import { database, dbBlogs } from '../../config';

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
            openSnackBar: false,
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
        let mEditorValue = stripTags(content);
        let nEditorValue = mEditorValue.replace(/&nbsp;/gi, "");
        this.setState({ editorValue: nEditorValue})   
    }

    publishButton = (param, event) => {
        let uid = this.getUserUID();
        let blogID = this.props.updateInfo.id;
        let title = this.state.titleValue;
        let content = this.state.editorValue;
        if ( content === ""){
            content = this.props.updateInfo.content
        }
        let state = "published"
        this.props.updateBlog(uid, blogID, title, content, state);
        history.push("/publishedblogs");
        window.location.reload();
    }

    saveButton = () => {
        let uid = this.getUserUID();
        let blogID = this.props.updateInfo.id;
        let title = this.state.titleValue;
        let content = this.state.editorValue;
        let state = "saved"
        if ( content === ""){
            content = this.props.updateInfo.content
        }
        this.props.updateBlog(uid, blogID, title, content, state);

        history.push("/unpublishedBlog");
        window.location.reload();
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
        console.log(this.props.updateInfo.id);
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
                    <Editor
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        // defaultEditorState={this.state.editorState}
                        defaultEditorState={this.state.editorState}
                        // onEditorStateChange={this._onChange.bind(this)}
                        // defaultValue={this.state.editorState}
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
                        {/* <Snackbar
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
                            message={<span id="message-id">Both fields are required!</span>}
                            /> */}

                        {/* snackbar for published/saved blog  */}
                        {/* <Snackbar
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
                            /> */}

                </div>
            </div>
        );
    }
}

export default (UpdateBlog);         