
import Joi from '@hapi/joi';

const reviewValidation = Joi.object({	
	movie:Joi.string().min(6).max(300).required(),
    user:Joi.string().min(6).max(300).required(),
	rating:Joi.number().min(1).max(10).required(),
    review:Joi.string().max(255).required()	

});

export {
    reviewValidation
}