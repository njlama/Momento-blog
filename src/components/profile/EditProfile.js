import React from 'react';

import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel } from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
/** firebase */
import firebase from 'firebase';
import { database, dbAccounts, dbBlogs} from '../../config';

export default class EditProfile extends React.Component {

    state = {
        userName: "",
        userUID: "", 
        userEmail: "",
        openUnpublishedToPublish: false,
        isDisableButton: true,
    }

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                this.setState({ 
                    userUID: user.uid,
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

    editUserName = (e) => {
        // console.log(this.state.userName);
        this.setState({
            userName: e.target.value, 
            isDisableButton: false
        })
    }

    updateUserNameHandler = () => {
        dbAccounts.child(this.state.userUID).update({
            name: this.state.userName
        });
        this.setState({ openUnpublishedToPublish: true })
    }

    handleCloseForUnpublishedToPublish = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          this.setState({ openUnpublishedToPublish: false });
    }

    render(){
        return(
            <div>
            <p className="edit-header">Edit profile</p>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                        Name
                        </Col>
                        <Col sm={10}>
                        <FormControl type="text" 
                                onChange={this.editUserName.bind(this)}
                                defaultValue={this.state.userName}
                                placeholder="Name" />
                        </Col>
                    </FormGroup>
                
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                        Email
                        </Col>
                        <Col sm={10}>
                        <FormControl type="email"
                                    value={this.state.userEmail}
                                    disabled
                                    placeholder="Email"/>
                        </Col>
                    </FormGroup>
                    <FormGroup className="editResetButton">
                        <Button 
                            onClick={this.updateUserNameHandler.bind(this)}
                            disabled={this.state.isDisableButton}>Save</Button>
                    </FormGroup>
                </Form>

                {/* SnackBar for name update */}
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
                    message={<span id="message-id">changes are saved</span>}
                    />
            </div>
        );
    }
}