import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDFtVHeS2oTTA2VvNYSxugoNfVVwCw2di0",
    authDomain: "momento-blog.firebaseapp.com",
    databaseURL: "https://momento-blog.firebaseio.com",
    projectId: "momento-blog",
    storageBucket: "momento-blog.appspot.com",
    messagingSenderId: "9950140424"
  };
  firebase.initializeApp(config);

  export const database = firebase.database().ref();
  export const dbAccounts = database.child("/accounts");
  export const dbBlogs = database.child("/blogs");
  export const storage = firebase.storage().ref('/images/'); 
  export const ppStorage = firebase.storage().ref('/profilePicture/'); 