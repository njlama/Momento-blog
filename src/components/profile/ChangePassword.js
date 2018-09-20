import React from 'react';
import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel } from 'react-bootstrap';

/** firebase */
import firebase from 'firebase';
import { database, dbAccounts, dbBlogs} from '../../config';

export default class ChangePassword extends React.Component {

    state = {
        newPassword: "", 
        oldPassword: ""
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

        this.reauthenticate(this.state.oldPassword).then(() =>{
            var user = firebase.auth().currentUser;
            console.log(newPw);
            user.updatePassword(newPw).then(()=>{
                console.log("password is changed")
            }).catch(function(error){
                console.log("error")
            });
        }).catch(error => {
            console.log("error: "+ error)
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
                            onChange={this.oldPasswordHandler.bind(this)}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                    New password
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" 
                                placeholder="New password"
                                onChange={this.newPasswordHandler.bind(this)} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                    <Button type="button"
                            onClick={this.changePWbutton.bind(this)}>Change Password</Button>
                    </Col>
                </FormGroup>
                </Form>
                </div>
            </div>
        );
    }
}