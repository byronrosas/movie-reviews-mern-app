import { MOVIE_ACTIONS } from "../actions/movie.action";


const defaultState = {

};


export function movieReducer(state = defaultState, action){
    console.log("REDUCER MOVIE",action);
    switch(action.type){
        case MOVIE_ACTIONS.GET_MOVIES:
            console.log("get - movie",action);
            //set on redux state
            return action;        

        case MOVIE_ACTIONS.ADD_MOVIE:
            console.log("add - movie",action);
            //set on redux state
            return action; 
        case MOVIE_ACTIONS.SELECT_MOVIES:
            console.log("select - movie",action);
            //set on redux state
            return action; 
        case MOVIE_ACTIONS.REMOVE_MOVIES:
            console.log("remove - movie",action);
            //set on redux state
            return action;        
        default:            
            console.log("STATEINIT");
            console.log(state);
            return state;
    }
    
}
