
import Joi from '@hapi/joi';

const movieValidation = Joi.object({	
	user:Joi.string().min(6).max(300).required(),
	title:Joi.string().max(255).required()	

});

export {
    movieValidation
}