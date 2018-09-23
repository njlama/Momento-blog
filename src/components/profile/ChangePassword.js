import React from 'react';
import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
/** firebase */
import firebase from 'firebase';
import { database, dbAccounts, dbBlogs} from '../../config';

export default class ChangePassword extends React.Component {

    state = {
        newPassword: "", 
        oldPassword: "",
        open: false,
        openErrorPwSnackBar: false
    }

    newPasswordHandler = (e) => {
        this.setState({
            newPassword: e.target.value
        });
    }

    oldPasswordHandler = (e) => {
        this.setState({
            oldPassword: e.target.value
        });
    }

    changePWbutton = () => {
        let newPw = this.state.newPassword

        /** Reauthenticating user to change password */
        this.reauthenticate(this.state.oldPassword).then(() =>{
            console.log(newPw)
            var user = firebase.auth().currentUser;

            user.updatePassword(newPw).then(()=>{
                this.setState({ open: true });
                }).catch(function(error){
            });
        }).catch(error => {
            this.setState({ openErrorPwSnackBar: true})
        });

        this.setState({
            newPassword: "", 
            oldPassword: ""
        })    
    }

    reauthenticate = (oldPassword, newPassword) => {
        var user = firebase.auth().currentUser;
        /** Provided credential by user: in our case its Email and PW */
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
        /** Below returns promise so this func also returns promise */
        // return user.reauthenticateWithCredential(cred);
        return user.reauthenticateAndRetrieveDataWithCredential(cred);
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false });
    };

    handleClosePwError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openErrorPwSnackBar: false });
    }

    render(){
        return(
            <div>
                <p>Change password here</p>
                <div>
                <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                    Old password
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" 
                            placeholder="old password" 
                            onChange={this.oldPasswordHandler.bind(this)}
                            value={this.state.oldPassword}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                    New password
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" 
                                placeholder="New password"
                                onChange={this.newPasswordHandler.bind(this)} 
                                value={this.state.newPassword}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button type="button"
                            onClick={this.changePWbutton.bind(this)}>Change Password</Button>
                </FormGroup>
                </Form>
                </div>

                {/* SnackBar for wrong password or missing password field */}
                <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.openErrorPwSnackBar}
                        autoHideDuration={6000}
                        onClose={this.handleClosePwError}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Incorrect password</span>}
                        />

                {/* SnackBar for name update */}
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">changes are saved</span>}
                        />
            </div>
        );
    }
}