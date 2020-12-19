import { Request, Response } from 'express';
import CoreService from '../../services/rest/core.service';
import { FetchedMovie, IMoviePopulated } from '../../types';
import { Constants } from '../../utilities/constants';
import { ErrorConst } from '../../utilities/errors';
import logger from '../../utilities/winston';

export class CoreController {
  private coreService;

  constructor() {
    // bind 'this' here in case of normal functions(methods). For arrow functions it is not required
    this.coreService = new CoreService();
  }

  loadAllMovies = async (req: Request, res: Response) => {
    try {
      let movies = await this.coreService.fetchAllMovies(req, res);
      movies = movies?.splice(0, 500);
      const moviesArr: IMoviePopulated[] = [];
      movies?.forEach((element: FetchedMovie) => {
        const moviesToInsert: IMoviePopulated = {
          title: element['title'],
          releaseYear: element['release_year'],
          locations: element['locations'],
          funFacts: element['fun_facts'],
          productionCompany: element['production_company'],
          distributor: element['distributor'],
          director: element['director'],
          writer: element['writer'],
          actor1: element['actor_1'],
          actor2: element['actor_2'],
          actor3: element['actor_3'],
        };
        moviesArr.push(moviesToInsert);
      });
      const savedMovies = await this.coreService.bulkCreateMovies(moviesArr, res);
      return res.status(200).send({ movies: savedMovies });
    } catch (err) {
      this.logMessages('[loadAllMovies][err] ' + err.message, res, true);
      return res.status(err.status || ErrorConst.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  getAllMovies = async (req: Request, res: Response) => {
    try {
      const releaseYear = String(req.query.releaseYear);
      const limit = req.query.limit ?? Constants.DEFAULT_PAGINATION_LIMIT;
      const offset = req.query.offset ?? Constants.DEFAULT_OFFSET;

      const movies = await this.coreService.getMovieByReleaseYear(
        releaseYear,
        parseInt(limit as string),
        parseInt(offset as string),
        res,
      );
      res.status(200).send({ movies });
    } catch (err) {
      this.logMessages('[getAllMovies][err] ' + err.message, res, true);
      res.status(err.status || ErrorConst.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  insertNewMovie = async (req: Request, res: Response) => {
    try {
      const movie: IMoviePopulated = {
        title: req.body['title'],
        releaseYear: req.body['releaseYear'],
        locations: req.body['locations'],
        funFacts: req.body['funFacts'],
        productionCompany: req.body['productionCompany'],
        distributor: req.body['distributor'],
        director: req.body['director'],
        writer: req.body['writer'],
        actor1: req.body['actor1'],
        actor2: req.body['actor2'],
        actor3: req.body['actor3'],
      };
      const newMovie = await this.coreService.createMovie(movie, res);
      res.status(200).send({ movie: newMovie });
    } catch (err) {
      this.logMessages('[insertNewMovie][err] ' + err.message, res, true);
      res.status(err.status || ErrorConst.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  getMovieById = async (req: Request, res: Response) => {
    try {
      const movie = await this.coreService.getMovieById(req.params.movieId, res);
      res.status(200).send({ movie });
    } catch (err) {
      this.logMessages('[getMovieById][err] ' + err.message, res, true);
      res.status(err.status || ErrorConst.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  updateMovieById = async (req: Request, res: Response) => {
    try {
      const movie = await this.coreService.updateMovieById(req.params.movieId, req.body, res);
      res.status(200).send({ movie });
    } catch (err) {
      this.logMessages('[updateMovieById][err] ' + err.message, res, true);
      res.status(err.status || ErrorConst.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  deleteMovieById = async (req: Request, res: Response) => {
    try {
      const movie = await this.coreService.deleteMovieById(req.params.movieId, res);
      return res.status(200).send({ movie });
    } catch (err) {
      this.logMessages('[deleteMovieById][err] ' + err.message, res, true);
      return res.status(err.status || ErrorConst.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  private logMessages(msg: string, res?: Response, timed?: boolean, err?: Error) {
    logger.info(`[ts-mongoose][controllers][v1][core] ${msg}`, res, timed, err);
  }
}
