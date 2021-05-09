import createError from "http-errors";
import { id } from "../../models/validation/review.validation";

//remove controller
function RemoveReviewsCtrl(reviewPersistence){ 
    
    // validate fields
    async function isValid(body) {
        const result = await id.validateAsync(body);
        return result;
    }

    return async (req,res,next)=>{        

        try {            
            
            const userId = req.userId;
            // validate
            const valuesResult = await isValid(req.params);  

            const { id } = valuesResult;

            // verify review exists            
            const reviewFound = await reviewPersistence.getById(id);
            
            if(!reviewFound) throw createError.NotFound("Review not found");

            const result = await reviewPersistence.remove(id,userId);
            console.log(result);

            res.json({message:'removed'});

        } catch (error) {
            console.log(error.message);
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    }
}

export default RemoveReviewsCtrl;