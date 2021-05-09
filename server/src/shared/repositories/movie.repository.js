import { movieModel } from "../../models";

export default class MovieRepository {
    async save(movie) {
        // create new model
        const newMovie = new movieModel(movie);
        // save
        const result = await newMovie.save();

        return result;
    }

    async listWithRating(page, limit) {
        let skip = (page*limit);        
        // search by email                 
        const result = await movieModel.aggregate([
            [
                {
                    $lookup:
                    {

                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'movie',
                        as: 'reviews'
                    }
                },
                {
                    $project: {
                        title: 1,
                        createdAt:1,
                        ratingAvg: {
                            $avg: "$reviews.rating"
                        }
                    }
                },
                { $sort : { createdAt : -1 } },
                {
                    $skip:skip
                },   
                {   
                    $limit : limit 
                }                        

            ]
        ]);


        return result;

    }

    async getById(id) {
        // search by id
        const result = await movieModel.findOne({ _id: id });

        return result;
    }

    async remove(id){          
        const result = await movieModel.deleteOne({_id:id});
        return result;
    }
}