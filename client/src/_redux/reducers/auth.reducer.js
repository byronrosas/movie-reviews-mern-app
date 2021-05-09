import { USER_ACTIONS } from "../actions/user.action";

const defaultStateUserLoginReducer = {
    token:null,
    firstname:null,
    lastname:null,
    isLogin:false
};


export function userLoginReducer(state = defaultStateUserLoginReducer, action){
    console.log("REDUCER USER",action);
    switch(action.type){
        case USER_ACTIONS.ADD_USER_LOGIN:
            console.log("add user");
            //set on redux state
            return setToLogin(action._id,action.firstname,action.lastname,action.token,action.isLogin);        
        case USER_ACTIONS.REMOVE_USER_LOGIN:
            //remove on redux state
            return defaultStateUserLoginReducer;
        default:            
            console.log("STATEINIT");
            console.log(state);
            return state;
    }
    
}

function setToLogin(_id,firstname,lastname,token,isLogin){
    return {        
        _id,
        token,
        firstname,
        lastname,
        isLogin
    }
}