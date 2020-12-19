import { Request, Response } from 'express';
import CoreService from '../../services/rest/core.service';
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
      let movies = this.coreService.fetchAllMovies(req, res);
      return movies;
    } catch (err) {
      this.logMessages('[loadAllMovies][err] ' + err.message, res, true);
      res.status(err.status || ErrorConst.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  getAllMovies = async (req: Request, res: Response) => {
    try {
    } catch (err) {
      this.logMessages('[getAllMovies][err] ' + err.message, res, true);
      res.status(err.status || ErrorConst.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  insertNewMovie = async (req: Request, res: Response) => {
    try {
    } catch (err) {
      this.logMessages('[insertNewMovie][err] ' + err.message, res, true);
      res.status(err.status || ErrorConst.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  getMovieById = async (req: Request, res: Response) => {
    try {
    } catch (err) {
      this.logMessages('[getMovieById][err] ' + err.message, res, true);
      res.status(err.status || ErrorConst.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  updateMovieById = async (req: Request, res: Response) => {
    try {
    } catch (err) {
      this.logMessages('[updateMovieById][err] ' + err.message, res, true);
      res.status(err.status || ErrorConst.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  deleteMovieById = async (req: Request, res: Response) => {
    try {
    } catch (err) {
      this.logMessages('[deleteMovieById][err] ' + err.message, res, true);
      res.status(err.status || ErrorConst.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  private logMessages(msg: string, res?: Response, timed?: boolean, err?: Error) {
    logger.info(`[ts-mongoose][controllers][v1][core] ${msg}`, res, timed, err);
  }
}
