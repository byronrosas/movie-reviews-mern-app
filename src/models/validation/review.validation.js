
import Joi from '@hapi/joi';

const reviewValidation = Joi.object({	
	movie:Joi.string().min(6).max(300).required(),    
	rating:Joi.number().min(1).max(10).required(),
    review:Joi.string().max(255).required()	

});

const reviewListParamsValidation = Joi.object({		
	page:Joi.number().min(0).max(200).required(),    
    movie:Joi.string().min(6).max(300).required(),    
});


const id = Joi.object({			
    id:Joi.string().min(6).max(300).required(),    
});

export {
    reviewValidation,
    reviewListParamsValidation,
    id
}