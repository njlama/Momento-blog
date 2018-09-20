import { FETCH_BLOGS, FETCH_BLOGS_AFTER_REMOVED, FETCH_BLOGS_CHANGED } from '../actions/types';

export default ( state = [], action) => {

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
                    state[i].title = action.aTitle,
                    state[i].content = action.aContent,
                    state[i].status= action.aStatus
                }
            }
            return [...state]
        default: 
            return state;
    }
};