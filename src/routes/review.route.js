import Router from 'express';
import * as ReviewController from '../controllers/review';
import { isAuth } from '../shared/midlewares/auth';
import MovieRepository from '../shared/repositories/movie.repository';
import ReviewRepository from '../shared/repositories/review.repository';
const router = Router();
let movieRepository = new MovieRepository();
let reviewRepository = new ReviewRepository();

router.post('/add',[isAuth],ReviewController.AddReviewCtrl(reviewRepository, movieRepository));

router.get('/list/:page/:movie',[isAuth],ReviewController.ListReviewsCtrl(reviewRepository,movieRepository));

router.delete('/remove/:id',[isAuth],ReviewController.RemoveReviewsCtrl(reviewRepository));

export default router;