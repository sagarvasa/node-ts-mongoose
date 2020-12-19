import { Request, Response } from 'express';
import logger from '../../utilities/winston';
import HTTPRequest from '../../utilities/http-request';
import { CustomError, ErrorConst } from '../../utilities/errors';
import { MovieRepository } from '../../repositories';

const httpRequest = new HTTPRequest();

export default class CoreService {
  private movieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
  }

  public async fetchAllMovies(req: Request, res: Response) {
    try {
      return await httpRequest.get(
        {
          url: ``,
          headers: {
            'content-type': 'application/json',
          },
        },
        res,
      );
    } catch (err) {
      this.throwErrorHandler(err, '[fetchAllMovies]', res, true);
    }
  }

  private throwErrorHandler(err: Error, method: string, res?: Response, timed?: boolean) {
    let msg = err.message;
    logger.info(`[ts-mongoose][services][rest]${method} err ${msg}`, res, timed);
    throw err;
  }
}
