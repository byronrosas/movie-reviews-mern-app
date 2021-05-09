import Router from 'express';
import * as MovieController from '../controllers/movie';
import { isAuth } from '../shared/midlewares/auth';
import MovieRepository from '../shared/repositories/movie.repository';
import ReviewRepository from '../shared/repositories/review.repository';
const router = Router();
let movieRepository = new MovieRepository();
let reviewRepository = new ReviewRepository();

router.post('/add',[isAuth],MovieController.AddMovieCtrl(movieRepository, reviewRepository));

router.get('/list-rating/:page',[isAuth],MovieController.ListMovieWithRatingCtrl(movieRepository));

router.delete('/remove/:id',[isAuth],MovieController.RemoveMovieCtrl(movieRepository,reviewRepository));

export default router;