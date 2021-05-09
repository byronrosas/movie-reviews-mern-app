import createError from "http-errors";
import { movieModel } from "../../models";
import { reviewListParamsValidation } from "../../models/validation/review.validation";

//list controller
function ListReviewsCtrl(reviewPersistence, moviePersistence){ 
    
    // validate fields
    async function isValid(body) {
        const result = await reviewListParamsValidation.validateAsync(body);
        return result;
    }

    return async (req,res,next)=>{        

        try {            

            const limit = 10;
            
            // validate
            const valuesResult = await isValid(req.params);  

            const { page,movie } = valuesResult;

            // verify movie exists            
            const movieFound = await moviePersistence.getById(movie);
            
            if(!movieFound) throw createError.NotFound("Movie not found");

            const reviews = await reviewPersistence.listByMovie(movie,page,limit);
            

            res.json({page,limit,reviews});

        } catch (error) {
            console.log(error.message);
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    }
}

export default ListReviewsCtrl;