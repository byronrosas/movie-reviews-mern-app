import * as api from "../../api/reviews.service";
export const REVIEW_ACTIONS = {
    GET_REVIEWS:0,
    ADD_REVIEWS:1,
    REMOVE_REVIEWS:2    
}


export const getReviewsAPI = (page,movie) => async (dispatch) => {
    try {
      const content = await api.getReviews(page,movie);              
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


export const addReviewAPI = (review) => async (dispatch) => {
    try {
      const content = await api.addReview(review);              
      console.log("content",content.data);
        return {
            type:REVIEW_ACTIONS.ADD_REVIEWS,         
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

export const removeReviewAPI = (id) => async (dispatch)=> {
    const content = await api.removeReview(id);             
    return {
        type:REVIEW_ACTIONS.REMOVE_REVIEWS,
        _id:id    
    }
};
