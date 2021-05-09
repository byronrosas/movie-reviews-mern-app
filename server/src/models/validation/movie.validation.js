
import Joi from '@hapi/joi';

const movieValidation = Joi.object({		
	title:Joi.string().max(255).required(),
    rating:Joi.number().min(1).max(10).required(),
    review:Joi.string().max(255).required()	    	
});

const movieListParamsValidation = Joi.object({		
	page:Joi.number().min(0).max(200).required(),    
});

const id = Joi.object({			
    id:Joi.string().min(6).max(300).required(),    
});


export {
    movieValidation,
    movieListParamsValidation,
    id
}