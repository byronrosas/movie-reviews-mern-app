import { REVIEW_ACTIONS } from "../actions/review.action";


const defaultState = {

};


export function reviewReducer(state = defaultState, action){
    console.log("REDUCER MOVIE",action);
    switch(action.type){
        case REVIEW_ACTIONS.GET_REVIEWS:
            console.log("get - review",action);
            //set on redux state
            return action;        

        case REVIEW_ACTIONS.ADD_REVIEWS:
            console.log("add - review",action);
            //set on redux state
            return action;
        case REVIEW_ACTIONS.REMOVE_REVIEWS:
            console.log("remove - reviews",action);
            //set on redux state
            return action;             
        default:            
            console.log("STATEINIT");
            console.log(state);
            return state;
    }
    
}
