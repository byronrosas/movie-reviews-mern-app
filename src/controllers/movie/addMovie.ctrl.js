import { movieModel } from "../../models";
import { movieValidation } from "../../models/validation/movie.validation";

// Add movie controller
function AddMovieCtrl(moviePersistence,reviewPersistence){ 
    
    // validate fields
    async function isValid(body) {
        const result = await movieValidation.validateAsync(body);
        return result;
    }

    return async (req,res,next)=>{
        // start session
        let session = await movieModel.startSession();
        session.startTransaction();

        try {
            // user logged
            const userId = req.userId;

            // validate
            const valuesResult = await isValid(req.body);  

            const { title, rating, review } = valuesResult;

             // save movie
            const addedMovie = await moviePersistence.save({title, user: userId});             
            // save review
            const addedReview = await reviewPersistence.save({movie:addedMovie._id, rating, review, user: userId}); 

            // commit
            await session.commitTransaction();
            session.endSession();

            res.json({movie:addedMovie,review:addedReview});

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

export default AddMovieCtrl;