import * as api from "../../api/movie.service";
import { PERSISTENCE_STORAGE } from "../store";
export const MOVIE_ACTIONS = {
    GET_MOVIES:0,
    ADD_MOVIES:1,
    SELECT_MOVIES:3,
    REMOVE_MOVIES:4   
}


export const getMoviesAPI = (page) => async (dispatch) => {
    try {
      const data = JSON.parse(localStorage.getItem(PERSISTENCE_STORAGE));
      const token = data ? data.userLoginReducer.isLogin ? data.userLoginReducer.token : ''  :  '';      
      const content = await api.getMovies(page,token);              
      
        return {         
            status:200,
            result:content.data
        }

    } catch (error) {
        console.log("error=>",error.response.data.error.message);
        return {
            status:error.response.data.error.status,
            error:error.response.data.error.message?? 'an error has occurred, try again later '                        
        }
    }
};


export const addMovieAPI = (movie) => async (dispatch) => {
    try {
      const data = JSON.parse(localStorage.getItem(PERSISTENCE_STORAGE));
      const token = data ? data.userLoginReducer.isLogin ? data.userLoginReducer.token : ''  :  '';

      const content = await api.addMovie(movie, token);                    
        return {
            type:MOVIE_ACTIONS.ADD_MOVIES,         
            status:200,
            result:content.data
        }

    } catch (error) {
        console.log("error=>",error.response.data.error.message);
        return {
            status:error.response.data.error.status,
            error:error.response.data.error.message?? 'an error has occurred, try again later '                        
        }
    }
};


export const selectMovie = (movie) => {    
    return {
        type:MOVIE_ACTIONS.SELECT_MOVIES,
        title:movie.title,
        _id:movie._id    
    }
};

export const removeMovieAPI = (id) => async (dispatch) => {
    const data = JSON.parse(localStorage.getItem(PERSISTENCE_STORAGE));
    const token = data ? data.userLoginReducer.isLogin ? data.userLoginReducer.token : ''  :  '';

    const content = await api.removeMovie(id, token);             
    return {
        type:MOVIE_ACTIONS.REMOVE_MOVIES,
        _id:id    
    }
};