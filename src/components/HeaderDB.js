import React from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

/** firebase */
import firebase from 'firebase';
import { database, dbAccounts, dbBlogs} from '../config';
import { isNullOrUndefined } from 'util';
import createHistory from 'history/createBrowserHistory';


const history = createHistory();

class HeaderDB extends React.Component {
    
    state = {
        left: false, 
        logout: false,
        userEmail: "", 
        userID: ""
    }

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.setState({
                    userEmail: user.email,
                    userID: user.uid
                })
                this.dbCreateAccount(user.email, user.uid)

                
            } else {
              // No user is signed in.
              console.log(" No User is present");
              history.push("/");
              /**
               * Reload the browser
               */
              window.location.reload();
            }
          }.bind(this));  /** !Important bind(this) */
          
    }

     /** Connecting with Real database */

   dbCreateAccount = (mEmail, uid) => { 
        dbAccounts.child(uid).on('value', (snapShot)=>{
            if(snapShot.val() === null){
                console.log("Will set new database for new user")
                dbAccounts.child(uid).set({
                    email: mEmail, 
                    name: ""
                })
            } else {
                dbAccounts.child(uid).set({
                    email: mEmail, 
                    name: snapShot.val().name
                }) 
            } 
        })
    }

    /**
     * Drawer and UI
     */

    
    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };

    
    LogoutHandler = (e) => {
        this.setState({ logout: true })
    } 

    handleClose = () => {
        this.setState({ logout: false });
    };

    handleCloseYesButton = () => {
        this.setState({ logout: false });
        firebase.auth().signOut()
            .then(()=> {
                // history.push('/');
                // window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    };

    displayProfile = () => {
        history.push('/dashboard/profile');
        window.location.reload();
    } 

    render(){
        return(
            <header>
                <div className="sideNavDiv">
                     <Button onClick={this.toggleDrawer('left', true)}
                        className="sideNavIcon">&#9776; Menu</Button>
                     <Drawer open={this.state.left} 
                        onClose={this.toggleDrawer('left', false)}
                        className="drawer-maindiv">
                        <div className="profilePicture">
                            {/* Blogger picture goes here */}
                            <p className="drawerUserEmail"
                                onClick="this.displayProfile.bind(this)">
                                <NavLink to="/dashboard/profile">{this.state.userEmail}</NavLink>
                            </p>
                        </div>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('left', false)}
                            onKeyDown={this.toggleDrawer('left', false)}
                            className="leftDrawer" >
                                <NavLink to="/createNewBlog">Create Blog</NavLink>
                                <NavLink to="/publishedblogs">Published Blog</NavLink>
                                <NavLink to="/unpublishedBlog">Unpublished Blog</NavLink>
                                <NavLink to="#" onClick={this.LogoutHandler.bind(this)}>Log Out</NavLink>
                        </div>
                    </Drawer>

                    {/* logout dialog box */}
                    <Dialog
                        open={this.state.logout}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        className="logoutDialog">
                        <DialogTitle id="alert-dialog-title">
                            Are you sure you want to logout?
                        </DialogTitle>
                        <DialogActions  className="logoutDialogButtons">
                            <Button onClick={this.handleCloseYesButton.bind(this)} 
                                    color="primary">
                            Yes
                            </Button>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                            No
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </header>
        );
    }
}

export default (HeaderDB);