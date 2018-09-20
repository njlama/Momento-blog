import React from 'react';

import '../css/displayProfile.css';
import '../css/dashBoard.css';
import HeaderDB from './HeaderDB';
import EditProfile from './profile/EditProfile';
import ChangePassword from './profile/ChangePassword';


export default class DisplayProfile extends React.Component{
  
    state = {
        isEditProfile: true, 
        userEmail: "",
        uid: ""
    }

    editProfileHandler = () => {
        this.setState({ isEditProfile: true})
    }

    changePasswordHandler = () => {
        this.setState({ isEditProfile: false})
    }
    
    render(){
        return(
            <div className="profile-root">
                <HeaderDB/>
                <div className="profile-maindiv">
                    <div className="profile-navbar">
                        <ul className="profileNavbar-ul">
                            <li onClick={this.editProfileHandler.bind(this)}><a>
                                    Edit Profile</a></li>
                            <li onClick={this.changePasswordHandler.bind(this)}><a >
                                    Change password</a></li>
                        </ul>
                    </div>

                    <div className="profile-article">
                        { this.state.isEditProfile 
                            ? 
                            <EditProfile/>
                            : 
                            <ChangePassword/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}