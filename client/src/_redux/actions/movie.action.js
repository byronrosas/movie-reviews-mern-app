import * as api from "../../api/movie.service";
export const MOVIE_ACTIONS = {
    GET_MOVIES:0,
    ADD_MOVIES:1,
    SELECT_MOVIES:3,
    REMOVE_MOVIES:4   
}


export const getMoviesAPI = (page) => async (dispatch) => {
    try {
      const content = await api.getMovies(page);              
      console.log("content",content.data);
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
      const content = await api.addMovie(movie);              
      console.log("content",content.data);
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
    console.log("mov selected",movie);
    return {
        type:MOVIE_ACTIONS.SELECT_MOVIES,
        title:movie.title,
        _id:movie._id    
    }
};

export const removeMovieAPI = (id) => async (dispatch) => {
    const content = await api.removeMovie(id);             
    return {
        type:MOVIE_ACTIONS.REMOVE_MOVIES,
        _id:id    
    }
};