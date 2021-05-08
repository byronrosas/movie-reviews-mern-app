import { Schema } from 'mongoose';
import bcrypt from "bcryptjs";


const UserSchema = new Schema({    
    firstname: { type: String,minLength:1, maxLength: 150, required:true },
    lastname:{ type: String, minLength:1, maxLength: 150, required:true },    
    email:{ type: String, maxLength: 255, lowercase:true,required:true, unique:true },
    password:{ type: String, minLength: 6, maxLength: 100, required:true },            
},{
    timestamps:true,
    versionKey:false
});


UserSchema.statics.encryptData = async (data) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
};
  
UserSchema.statics.compareData = async (data, hashData) => {
return await bcrypt.compare(data, hashData)
}


UserSchema.pre('validate',async function(next){
    try{
        if (this.isNew) {
            const hashPassword = await UserSchema.statics.encryptData(this.password);
            this.password = hashPassword;            
        }
        next();
    }catch(error){
        next(error);
    }
});

export default model('User',UserSchema);