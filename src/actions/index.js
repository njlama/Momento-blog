import { FETCH_BLOGS, FETCH_BLOGS_AFTER_REMOVED ,FETCH_BLOGS_CHANGED, EDIT_REDUCER, EACH_DATA_REDUCER} from './types';
import { dbBlogs } from '../config';
import firebase from 'firebase';

export const addPublishedBlog = (uid, nTitle, nContent, url, nDate, nUserName ) => async dispatch => {
    dbBlogs.child(uid).push().set({
        title: nTitle,
        content: nContent,
        image: url,
        date: nDate,
        userName: nUserName,
        status: "published"
    })
}

export const addSavedBlog = (uid, nTitle, nContent, url, mDate, nUserName) => async dispatch => {
    dbBlogs.child(uid).push().set({
        title: nTitle,
        content: nContent,
        image: url,
        date: mDate,
        userName: nUserName,
        status: "saved"
    })
}

export const removeBlog = (blogID, uid) => async dispatch => {
    dbBlogs.child(uid).child(blogID).remove();
}

export const updateBlog = (uid, blogID, nTitle, nContent, nStatus, url, nDate, nUser) => async dispatch => {
    dbBlogs.child(uid).child(blogID).update({
        title: nTitle, 
        content: nContent,
        image: url,
        date: nDate,
        userName: nUser,
        status: nStatus
    });
}

export const fetchBlogs = (uid) => async dispatch => { 
    dbBlogs.child(uid).on("child_added", snapShot => {
        dispatch({
            type: FETCH_BLOGS, 
            aTitle: snapShot.val().title, 
            aContent: snapShot.val().content, 
            aStatus: snapShot.val().status,
            image: snapShot.val().image,
            date: snapShot.val().date,
            userName: snapShot.val().userName,
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
            id: snapShot.key, 
            title: snapShot.val().title,
            content: snapShot.val().content,
            status: snapShot.val().status, 
            image: snapShot.val().image,
            date: snapShot.val().date,
            userName: snapShot.val().userName
        })
    })
}

/** For Edit UnpublishedBlog reducer*/
export const updateUnpublishedBlog = (title, content, id, image, date, userName) => {
    return {
        type: EDIT_REDUCER,
        title,
        content,
        id,
        image,
        date,
        userName
    }
}

/** For each data reducer*/

export const eachDataDisplay= (title, content, id, image, date, userName) => {
    return{
        type: EACH_DATA_REDUCER,
        title,
        content,
        id,
        image,
        date,
        userName
    }
}
