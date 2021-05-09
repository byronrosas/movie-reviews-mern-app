import createError from "http-errors";
import { movieModel } from "../../models";
import { id } from "../../models/validation/movie.validation";


//remove controller
function RemoveMovieCtrl(moviePersistence,reviewPersistence){ 
    
    // validate fields
    async function isValid(body) {
        const result = await id.validateAsync(body);
        return result;
    }

    return async (req,res,next)=>{        
        // start session
        let session = await movieModel.startSession();
        session.startTransaction();
        try {                    
            
            // validate
            const valuesResult = await isValid(req.params);  

            const { id } = valuesResult;

            // verify review exists            
            const movieFound = await moviePersistence.getById(id);
            
            if(!movieFound) throw createError.NotFound("Review not found");

            const result = await moviePersistence.remove(id);

            const resultReview = await reviewPersistence.removeByMovie(movieFound._id);

            console.log(result);

            // commit
            await session.commitTransaction();
            session.endSession();
            res.json({message:'removed'});

        } catch (error) {
             // abort and close
             await session.abortTransaction();
             session.endSession();
            console.log(error.message);
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    }
}

export default RemoveMovieCtrl;