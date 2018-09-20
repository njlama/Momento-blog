import React from 'react';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export default class Header extends React.Component {

    signinHandler = () => {
        history.push('/signin-login');
        window.location.reload();
    }
    render(){
        return(
            <header>
                <div className="nav-bar">
                <div className="left-navbar">
                    <span style={{ color: "white"}}>Memento</span>
                </div>
                <div className="right-navbar">
                    <a style={{ color: "white"}}
                        onClick={this.signinHandler.bind(this)}>Sign In</a>
                </div>
                </div>
            </header>
        );
    }
}