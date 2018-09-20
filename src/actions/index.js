import { FETCH_BLOGS, FETCH_BLOGS_AFTER_REMOVED ,FETCH_BLOGS_CHANGED} from './types';
import { dbBlogs } from '../config';
import firebase from 'firebase';

export const addPublishedBlog = (uid, nTitle, nContent) => async dispatch => {
    dbBlogs.child(uid).push().set({
        title: nTitle,
        content: nContent,
        status: "published"
    })
}

export const addSavedBlog = (uid, nTitle, nContent) => async dispatch => {
    dbBlogs.child(uid).push().set({
        title: nTitle,
        content: nContent,
        status: "saved"
    })
}

export const removeBlog = (blogID, uid) => async dispatch => {
    dbBlogs.child(uid).child(blogID).remove();
}

export const updateBlog = (uid, blogID, nTitle, nContent, nStatus) => async dispatch => {
    dbBlogs.child(uid).child(blogID).update({
        aTitle: nTitle, 
        aContent: nContent,
        aStatus: nStatus
    });
}

export const fetchBlogs = (uid) => async dispatch => { 
    dbBlogs.child(uid).on("child_added", snapShot => {
        // console.log(snapShot.key)
        dispatch({
            type: FETCH_BLOGS, 
            aTitle: snapShot.val().title, 
            aContent: snapShot.val().content, 
            aStatus: snapShot.val().status,
            id: snapShot.key
        });
    });
}

export const fetchBlogsAfterRemoved = (uid) => async dispatch => {
    dbBlogs.child(uid).on("child_removed", snapShot =>{
        dispatch({
            type: FETCH_BLOGS_AFTER_REMOVED, 
            id: snapShot.key
        })
    })
}

export const fetchBlogsAfterChanged = (uid) => async dispatch => {
    dbBlogs.child(uid).on("child_changed", snapShot =>{
        dispatch({
            type: FETCH_BLOGS_CHANGED, 
            id: snapShot.key
        })
    })
}

