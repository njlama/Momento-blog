import React from "react";
import firebase from 'firebase';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { database } from '../config';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import { NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export default class LoginForm extends React.Component {


    state = {
        loginToSignin: true, 
        email: "",
        pass: "",
        error: "",
        openSnackbar: false,
    }

    

    loginToSigninHandler = () => {
        this.setState({ 
            loginToSignin: !this.state.loginToSignin,
            email: "",
            pass: "",
            error: "",
            openSnackbar: false
        })
    }

    emailOnchangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            email: e.target.value
        });
    }

    passOnchangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            pass: e.target.value
        });

    }

    errorHandler = (message) => {
        this.setState({ error: message});
    }

    signupHandler = (e) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
            .then(() => {
                history.push("/dashboard");
                /**
                 * Reload the browser
                 */
                window.location.reload();
            })
            .catch(function(error) {
                this.errorHandler(error.message);
                this.setState({ openSnackbar: true });
            }.bind(this));   
    }

    loginHandler = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
            .then(() => {
                history.push("/dashboard");

                /**
                 * Reload the browser
                 */
                window.location.reload();
            })
            .catch(function(error) {
                this.errorHandler(error.message);
                this.setState({ openSnackbar: true });
            }.bind(this));  
    }

    handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    this.setState({ openSnackbar: false });
    };

    render(){

        firebase.auth().onAuthStateChanged((user) => {
          if(user){
            history.push("/dashboard");
            window.location.reload();
            console.log("user in App");
              
          } 
        })
        
        var viewStyle = {};
        var hideStyle = {};

        if( this.state.loginToSignin) {
            viewStyle.display = 'none';
        } else {
            hideStyle.display = 'none';
        }

        return(
            <div>
                
                <header>
                    <div className="momento-navbarSignin">
                        <NavLink to="/">Memento</NavLink>
                    </div>
                </header>
                
                <div className="formDiv">
                    <div style={viewStyle}>
                        <h1>Sign Up</h1>
                        <p>Already have account? 
                            <a onClick={this.loginToSigninHandler.bind(this)}>Log In</a>
                        </p>
                    </div>

                    <div style={hideStyle}>
                        <h1>Log In</h1>
                        <p>Don't have account.  
                            <a onClick={this.loginToSigninHandler.bind(this)}>Sign Up</a>
                        </p>
                    </div>

                    <FormControl className="formEmail formControl">
                        <InputLabel htmlFor="name-simple">Email</InputLabel>
                        <Input id="name-simple" 
                                value={this.state.email}
                                onChange={this.emailOnchangeHandler.bind(this)}/>

                    </FormControl><br/>

                    <FormControl className="formPassword formControl">
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input type="password" 
                                id="adornment-password" 
                                value={this.state.pass}
                                onChange={this.passOnchangeHandler.bind(this)}/>
                    </FormControl><br/>

                    <div>
                        <Button variant="outlined" 
                                className="signInButton" 
                                style={viewStyle}
                                onClick={this.signupHandler.bind(this)}>Sign In</Button>
                        <Button variant="outlined" 
                                className="signInButton" 
                                style={hideStyle}
                                onClick={this.loginHandler.bind(this)}>Log In</Button>
                    </div>

                    {/* snackbar */}
                    <div>
                        <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.openSnackbar}
                        autoHideDuration={2000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.error}</span>}/>
                    </div>
                </div>
            </div>
        );
    }
}