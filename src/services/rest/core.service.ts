import express, { Request, Response } from 'express';
import logger from '../../utilities/winston';
import HTTPRequest from '../../utilities/http-request';
import { CustomError, ErrorConst } from '../../utilities/errors';
import { MovieRepository } from '../../repositories';
import { FetchedMovie, ILooseObj, IMoviePopulated } from '../../types';
const httpRequest = new HTTPRequest();

export default class CoreService {
  private movieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
  }

  public async fetchAllMovies(req: Request, res: Response): Promise<FetchedMovie[] | undefined> {
    try {
      const movieJSON: FetchedMovie[] = await httpRequest.get(
        {
          url: `https://data.sfgov.org/resource/yitu-d5am.json`,
          headers: {
            'content-type': 'application/json',
          },
        },
        res,
      );
      return movieJSON;
    } catch (err) {
      this.throwErrorHandler(err, '[fetchAllMovies]', res, true);
    }
  }

  public async bulkCreateMovies(movies: IMoviePopulated[], res: Response) {
    try {
      return await this.movieRepository.bulkCreateMovies(movies, res);
    } catch (err) {
      logger.info('[ts-mongoose][services][bulkCreateMovies][err] ' + err.message, res, true);
      throw new CustomError(
        Number(err.status) || ErrorConst.INTERNAL_SERVER_ERROR,
        err.message || ErrorConst.GENERAL_ERROR_MSG,
      );
    }
  }

  public async createMovie(body: IMoviePopulated, res?: Response) {
    try {
      return await this.movieRepository.createMovie(body, res);
    } catch (err) {
      logger.info('[ts-mongoose][services][createMovie][err] ' + err.message, res, true);
      throw new CustomError(
        Number(err.status) || ErrorConst.INTERNAL_SERVER_ERROR,
        err.message || ErrorConst.GENERAL_ERROR_MSG,
      );
    }
  }

  public async getMovieByReleaseYear(releaseYear: string, limit: number, offset: number, res: Response) {
    try {
      const filterCondition = {
        releaseYear: releaseYear,
      };
      return await this.movieRepository.getMoviesData(filterCondition, limit, offset, res);
    } catch (err) {
      logger.info('[ts-mongoose][services][getMovieByReleaseYear][err] ' + err.message, res, true);
      throw new CustomError(
        Number(err.status) || ErrorConst.INTERNAL_SERVER_ERROR,
        err.message || ErrorConst.GENERAL_ERROR_MSG,
      );
    }
  }

  public async getMovieById(movieId: string, res?: Response) {
    try {
      return await this.movieRepository.findMovieById(movieId, res);
    } catch (err) {
      logger.info('[ts-mongoose][services][getMovieById][err] ' + err.message, res, true);
      throw new CustomError(
        Number(err.status) || ErrorConst.INTERNAL_SERVER_ERROR,
        err.message || ErrorConst.GENERAL_ERROR_MSG,
      );
    }
  }

  public async updateMovieById(movieId: string, body: ILooseObj, res?: Response) {
    try {
      const updateBody: ILooseObj = {};
      // Update only selected fields
      if (body.locations) {
        updateBody.locations = body.locations;
      }
      if (body.distributor) {
        updateBody.distributor = body.distributor;
      }
      if (body.funFacts) {
        updateBody.funFacts = body.funFacts;
      }
      if (body.actor1) {
        updateBody.actor1 = body.actor1;
      }
      if (body.actor2) {
        updateBody.actor2 = body.actor2;
      }
      if (body.actor3) {
        updateBody.actor3 = body.actor3;
      }
      return await this.movieRepository.updateMovieById(movieId, updateBody, res);
    } catch (err) {
      logger.info('[ts-mongoose][services][updateMovieById][err] ' + err.message, res, true);
      throw new CustomError(
        Number(err.status) || ErrorConst.INTERNAL_SERVER_ERROR,
        err.message || ErrorConst.GENERAL_ERROR_MSG,
      );
    }
  }

  public async deleteMovieById(movieId: string, res?: Response) {
    try {
      return await this.movieRepository.deleteMovieById(movieId, res);
    } catch (err) {
      logger.info('[ts-mongoose][services][deleteMovieById][err] ' + err.message, res, true);
      throw new CustomError(
        Number(err.status) || ErrorConst.INTERNAL_SERVER_ERROR,
        err.message || ErrorConst.GENERAL_ERROR_MSG,
      );
    }
  }

  private throwErrorHandler(err: Error, method: string, res?: Response, timed?: boolean) {
    const msg = err.message;
    logger.info(`[ts-mongoose][services][rest]${method} err ${msg}`, res, timed);
    throw err;
  }
}
