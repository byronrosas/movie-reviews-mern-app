import { Schema } from 'mongoose';


const MovieSchema = new Schema({        
    user: { type: Schema.Types.ObjectId, ref:"User", required:true },    
    title:{ type: String, maxLength: 255, required:true }  
},{
    timestamps:true,
    versionKey:false
});

export default model('Movie',MovieSchema);