import React from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { NavLink } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import '../css/nav-drawer.css'
/** firebase */
import firebase from 'firebase';
import { database, dbAccounts, dbBlogs, ppStorage} from '../config';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

class HeaderDB extends React.Component {
    
    state = {
        left: false, 
        logout: false,
        userEmail: "", 
        userID: "",
        fileName: "", 
        choosenProfileImage: null, 
        profileImageUrl: "", 
    }

    inputFileHandler = (e) => {
        // console.log(e.target.files[0]);
        this.setState({
            fileName: e.target.files[0].name,
            choosenProfileImage: e.target.files[0]
        })
    }

    uploadProfileHandler = () => {
        const imgName = this.state.fileName;
        const imageFile = this.state.choosenProfileImage;
        const userUID = this.state.userID;

        if(this.state.choosenProfileImage){
            const uploadTask = ppStorage.child(imgName).put(imageFile)
            uploadTask.on("state_changed",
                (snapshot) =>{
                    var mProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(mProgress === 100){
                        this.setState({ fileName: ""})
                    }
                },
                (error) =>{
                    console.log(error);
                }, 
                () => {
                    ppStorage.child(imgName).getDownloadURL().then(function(downloadURL){
                        this.setProfilePicture(userUID, downloadURL);
                    }.bind(this));
                });
        }
    }

    setProfilePicture = (uid, url) => {
        dbAccounts.child(uid).update({
            profilePicture: url
        })
    }

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.setState({
                    userEmail: user.email,
                    userID: user.uid
                })
                this.dbCreateAccount(user.email, user.uid); 
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
                console.log("Will set new database for new user");
                dbAccounts.child(uid).set({
                    email: mEmail, 
                    name: "",
                    profilePicture: ""
                })
            } else {
                this.setState({ profileImageUrl: snapShot.val().profilePicture});
                
                // dbAccounts.child(uid).set({
                //     email: mEmail, 
                //     name: snapShot.val().name,
                //     profilePicture: snapShot.val().profilePicture
                // }) 
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
        let profileImageUrl = this.state.profileImageUrl;
        return(
            <header>
                <div className="sideNavDiv">                
                    <Button onClick={this.toggleDrawer('left', true)}
                        className="sideNavIcon">&#9776; Menu</Button>
                    <Drawer open={this.state.left} 
                        onClose={this.toggleDrawer('left', false)}
                        className="drawer-maindiv">
                        <div className="drawer-height">
                            <div className="profilePicture">
                                <div><h2>Momento</h2></div>
                                <img src={ profileImageUrl || "https://via.placeholder.com/80x80"} 
                                        alt="profile image"
                                        className="profile-image"/>
                                <div className="fileinputs"> 
                                    <input type="file" className="file"
                                        onChange={this.inputFileHandler.bind(this)}
                                        accept="image/*"/>  
                                    <div className="fakefile"> 
                                        <input value={this.state.fileName}
                                            placeholder="Update image"
                                            disabled/>
                                        <Button variant="contained" 
                                            onClick={this.uploadProfileHandler.bind(this)}>
                                            <CloudUploadIcon/>
                                        </Button>
                                    </div>
                                </div>
                                <p className="drawerUserEmail"
                                    onClick="this.displayProfile.bind(this)">
                                    <NavLink to="/dashboard/profile">{this.state.userEmail}</NavLink>
                                </p>
                                <div className="border-div"></div>
                            </div>


                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer('left', false)}
                                onKeyDown={this.toggleDrawer('left', false)}
                                className="leftDrawer" >
                                    <NavLink to="/dashboard" activeClassName="selected">Dashboard</NavLink>
                                    <NavLink to="/createNewBlog" activeClassName="selected">Create Blog</NavLink>
                                    <NavLink to="/publishedblogs" activeClassName="selected">Published Blog</NavLink>
                                    <NavLink to="/unpublishedBlog" activeClassName="selected">Unpublished Blog</NavLink>
                                    <NavLink to="#" onClick={this.LogoutHandler.bind(this)}>Log Out</NavLink>
                            </div>
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