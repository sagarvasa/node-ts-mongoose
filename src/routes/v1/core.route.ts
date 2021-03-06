import { Router } from 'express';
import { CoreController } from '../../controllers/v1';

const router = Router();
const coreController = new CoreController();

// all routes belong to core controllers

/* eslint-disable  @typescript-eslint/no-misused-promises */
// Load all the movies in DB
router.post('/movies/load/all', coreController.loadAllMovies);
router.post('/movies/seeder/load', coreController.loadAllMoviesFromSeeder);

// Movies CRUD
router.get('/movies', coreController.getAllMovies);
router.post('/movies', coreController.insertNewMovie);

router.get('/movies/:movieId', coreController.getMovieById);
router.put('/movies/:movieId', coreController.updateMovieById);
router.delete('/movies/:movieId', coreController.deleteMovieById);

export default router;
