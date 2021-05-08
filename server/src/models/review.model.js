import { Schema } from 'mongoose';


const ReviewSchema = new Schema({    
    movie: { type: Schema.Types.ObjectId, ref:"Movie", required:true },
    user: { type: Schema.Types.ObjectId, ref:"User", required:true },
    rating: { type:Number, min:1, max: 10, required:true, default:1},    
    review:{ type: String, maxLength: 255, required:true }  
},{
    timestamps:true,
    versionKey:false
});

export default model('Review',ReviewSchema);