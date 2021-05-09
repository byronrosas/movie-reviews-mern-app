import { movieModel } from "../../models";
import { movieListParamsValidation } from "../../models/validation/movie.validation";

// list movie controller
function ListMovieWithRatingCtrl(moviePersistence){ 
    
    // validate fields
    async function isValid(body) {
        const result = await movieListParamsValidation.validateAsync(body);
        return result;
    }

    return async (req,res,next)=>{        

        try {            

            const limit = 10;
            
            // validate
            const valuesResult = await isValid(req.params);  

            const { page } = valuesResult;

            const movies = await moviePersistence.listWithRating(page,limit);
            

            res.json({page,limit,movies});

        } catch (error) {
            console.log(error.message);
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    }
}

export default ListMovieWithRatingCtrl;