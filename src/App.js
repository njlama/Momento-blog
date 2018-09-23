import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/index';
import firebase from 'firebase';

import HeaderSignup from './components/MainPage';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import CreateNewBlog from './components/CreateNewBlog';
import DisplayProfile from './components/DisplayProfile';
import PublishedBlog from './components/dashboardComponents/PublishedBlog';
import UnpublishedBlog from './components/dashboardComponents/UnpublishedBlog';
import UpdateBlog from './components/dashboardComponents/UpdateBlog';
import './App.css';

import createHistory from 'history/createBrowserHistory';
const history = createHistory();

class App extends Component {

  state = {
    uid: ""
  }
  componentWillMount = () => {
    const { dispatch } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        // history.push("/dashboard");
        // window.location.reload;
        let uid = user.uid;
        this.setState({ uid: user.uid});
        const fetchBlogs = bindActionCreators(actionCreators.fetchBlogs, dispatch);
        fetchBlogs(user.uid);
        const fetchBlogsAfterRemoved = bindActionCreators(actionCreators.fetchBlogsAfterRemoved, dispatch);
        fetchBlogsAfterRemoved(user.uid);
        const fetchBlogsAfterChanged = bindActionCreators(actionCreators.fetchBlogsAfterChanged, dispatch);
        fetchBlogsAfterChanged(user.uid);        
      } else {
        console.log("USer not present")
      }
    })
  }

  
  render() {
    let blogs = this.props.blogs.blogsReducer;
    let updateInfo = this.props.blogs.editReducer;
    // console.log(blogs);
    const { dispatch } = this.props;
    const addPublishedBlog = bindActionCreators(actionCreators.addPublishedBlog, dispatch);
    const addSavedBlog = bindActionCreators(actionCreators.addSavedBlog, dispatch);
    const removeBlog = bindActionCreators(actionCreators.removeBlog, dispatch);
    const updateBlog = bindActionCreators(actionCreators.updateBlog, dispatch);
    const updateUnpublishedBlog = bindActionCreators(actionCreators.updateUnpublishedBlog, dispatch);
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={HeaderSignup}/>
          <Route exact path="/signin-login" component={LoginForm}/>
          <Route exact path="/dashboard" component={Dashboard}/>

          <Route exact path="/createNewBlog" 
                  render={() => <CreateNewBlog addPublishedBlog={addPublishedBlog}
                                                addSavedBlog={addSavedBlog}/> }/>
  
          <Route exact path="/dashboard/profile" component={DisplayProfile}/>
          <Route exact path="/publishedblogs" 
                  render={() => <PublishedBlog blogs={blogs}
                                removeBlog={removeBlog}
                                uid={this.state.uid}
                                updateBlogFirebase={updateBlog}/> }/>
          <Route exact path="/unpublishedBlog"
                  render={() => <UnpublishedBlog blogs={blogs} 
                                removeBlog={removeBlog}
                                uid={this.state.uid}
                                updateUnpublishedBlog={updateUnpublishedBlog}
                                updateBlogFirebase={updateBlog}/>}/>
          <Route path="/unpublishedBlog/update-blog"
                  render={() => <UpdateBlog updateInfo={updateInfo}
                                updateBlog={updateBlog}/>}/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProp = state => (
  {
    blogs: state
  }
);

export default connect(mapStateToProp)(App);
