import { reviewModel } from "../../models";

export default class ReviewRepository{
    async save(review){        
        // create new model
        const newReview = new reviewModel(review);
        // save
        const result = await newReview.save();
        
        return result;
    }  
    
    
    async listByMovie(movie,page,limit){
        let skip = (page*limit);   
        const result = await reviewModel.find({movie:movie}).populate('user','firstname lastname').sort({createdAt:-1}).skip(skip).limit(limit)   
        return result;
    }

    async remove(id, idUser){          
        const result = await reviewModel.deleteOne({_id:id, user:idUser});
        return result;
    }

    async removeByMovie(movie){
        const result = await reviewModel.deleteMany({movie:movie});
        return result;
    }

    async getById(id) {
        // search by id
        const result = await reviewModel.findOne({ _id: id });

        return result;
    }
}