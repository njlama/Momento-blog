import React from 'react';

import { Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel } from 'react-bootstrap';
/** firebase */
import firebase from 'firebase';
import { database, dbAccounts, dbBlogs} from '../../config';

export default class EditProfile extends React.Component {

    state = {
        userName: "",
        userUID: "", 
        userEmail: "",
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
        this.setState({
            userName: e.target.value
        })
    }

    updateUserInfo = () => {
            dbAccounts.child(this.state.userUID).update({
                name: this.state.userName
            })
    }

    render(){
       
        return(
            <div className="profile-edit">
                <h4>Edit profile here</h4>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                        Name
                        </Col>
                        <Col sm={10}>
                        <FormControl type="text" 
                                onChange={this.editUserName.bind(this)}
                                // value={this.state.userName} 
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
                        <Button onClick={this.updateUserInfo.bind(this)}>Reset</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}