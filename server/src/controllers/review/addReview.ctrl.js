import createError from "http-errors";
import { reviewValidation } from "../../models/validation/review.validation";

// Add review controller
function AddReviewCtrl(reviewPersistence,moviePersistence){ 
    
    // validate fields
    async function isValid(body) {
        const result = await reviewValidation.validateAsync(body);
        return result;
    }

    return async (req,res,next)=>{
        try {
            // user logged
            const userId = req.userId;

            // validate
            const valuesResult = await isValid(req.body);                                   
            
            // verify movie exists
            const { movie } = valuesResult;
            const movieFound = await moviePersistence.getById(movie);
            
            if(!movieFound) throw createError.NotFound("Movie not found");
            

             // save
            const added = await reviewPersistence.save({...valuesResult, user: userId}); 

            res.json(added);

        } catch (error) {
            console.log(error.message);
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    }
}

export default AddReviewCtrl;