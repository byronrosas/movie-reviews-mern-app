import { userModel } from "../../models";

export default class UserRepository{
    async save(user){        
        // create new model
        const newUser = new userModel(user);
        // save
        const result = await newUser.save();
        
        return result;
    }    
    
    async getByEmail(email){                
        
        // search by email                 
         const result = await userModel.findOne({ email: email });

        return result;

    }

    async getById(id){        
        // search by id
        const result = await userModel.findOne({ _id: id });

        return result;   
    }
}