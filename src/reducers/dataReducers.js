import { FETCH_BLOGS, FETCH_BLOGS_AFTER_REMOVED, FETCH_BLOGS_CHANGED, EDIT_REDUCER } from '../actions/types';

export function blogsReducer( state = [], action) {

    switch(action.type){
        case FETCH_BLOGS:
            return [
                ...state, 
                {
                    title: action.aTitle,
                    content: action.aContent,
                    status: action.aStatus,
                    id: action.id
                }
            ];
        
        case FETCH_BLOGS_AFTER_REMOVED:
            for ( let i=0; i < state.length; i++){
                if(state[i].id === action.id){
                    state.splice(i,1)
                }
            };
            return [...state];
            
        case FETCH_BLOGS_CHANGED: 
            for ( let i=0; i<state.length; i++){
                if(state[i].id === action.id){
                    state[i].title = action.title,
                    state[i].content = action.content,
                    state[i].status= action.status
                }
            }
            return [...state]
        default: 
            return state;
    }
};

export function editReducer(state={}, action){
    switch(action.type){
        case EDIT_REDUCER:
            return {
                title : action.title,
                content : action.content,
                id: action.id
                // status : action.status
            }
        default:
            return state;
            
    }
}