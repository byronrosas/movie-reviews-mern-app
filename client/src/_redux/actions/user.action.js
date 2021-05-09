import * as api from "../../api/user.service";
export const USER_ACTIONS = {
    ADD_USER_LOGIN:0,
    REMOVE_USER_LOGIN:1,
    REGISTER_USER:2    
}


export const loginAPI = (email,password) => async (dispatch) => {
    try {
      const {data} = await api.login(email,password);
      console.log("TOKEN", data);
      dispatch({ 
            type: USER_ACTIONS.ADD_USER_LOGIN,            
            _id:data._id,
            firstname:data.firstname,
            lastname:data.lastname,
            token:data.token,
            isLogin:true                   
        });

        return {         
           status:200,
           result:{
            _id:data._id,
            firstname:data.firstname,
            lastname:data.lastname,
            token:data.token,
           } 
        }

    } catch (error) {
        console.log("error=>",error.response.data.error.message);
        return {
            status:error.response.data.error.status,
            error:error.response.data.error.message?? 'an error has occurred, try again later '                        
        }

    }
};
  

export const registerAPI = (user) => async (dispatch) => {
    try {
      const {data} = await api.register(user);
      console.log("TOKEN", data);
      dispatch({ 
            type: USER_ACTIONS.ADD_USER_LOGIN,            
            _id:data._id,
            firstname:data.firstname,
            lastname:data.lastname,
            token:data.token,
            isLogin:true                   
        });

        return {         
           status:200,
           result:{
            _id:data._id,
            firstname:data.firstname,
            lastname:data.lastname,
            token:data.token,
           } 
        }

    } catch (error) {
        console.log("error=>",error.response.data.error.message);
        return {
            status:error.response.data.error.status,
            error:error.response.data.error.message?? 'an error has occurred, try again later '                        
        }

    }
};
  