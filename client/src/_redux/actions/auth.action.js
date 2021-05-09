import { USER_ACTIONS } from "../reducers/auth.reducer";

export const addUserLogin = ({_id,firstname, lastname, token})=>({
    type:USER_ACTIONS.ADD_USER_LOGIN,
    firstname,
    lastname,
    token,
    _id
    isLogin:true
});


export const removeUserLogin = ()=>({
    type:USER_ACTIONS.REMOVE_USER_LOGIN
});