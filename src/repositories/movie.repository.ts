import { Response } from 'express';
import MovieModel from '../models/movie.model';
import { IMoviePopulated } from '../types/movies';
import { ErrorConst, CustomError } from '../utilities/errors';
import logger from '../utilities/winston';

/* eslint-disable @typescript-eslint/naming-convention */
export class MovieRepository {
  constructor(/* Add @inject to inject parameters */) {}

  async createMovie(body: IMoviePopulated, res?: Response) {
    const model = new MovieModel(body);
    return model.save().catch(err => {
      logger.info('[ts-mongoose][movie-repositories][createMovie][err] ' + err.message, res, true);
      if (err.code === ErrorConst.MONGO_DUPLICATE_ERROR) {
        throw new CustomError(ErrorConst.CONFLICT, ErrorConst.DUPLICATE_MOVIE);
      } else if (err.name === 'ValidationError') {
        throw new CustomError(ErrorConst.BAD_REQUEST, ErrorConst.VALIDATION_ERROR_MSG);
      } else {
        throw err;
      }
    });
  }

  async findMovieById(id: string, res?: Response) {
    return MovieModel.findById(id, { __v: 0 })
      .then(data => {
        if (!data) {
          throw new CustomError(ErrorConst.NOT_FOUND, ErrorConst.MOVIE_NOT_FOUND);
        }
        return data;
      })
      .catch(err => {
        logger.info('[ts-mongoose][movie-repositories][findMovieById][err] ' + err.message, res, true);
        if (err.name === 'ValidationError') {
          throw new CustomError(ErrorConst.BAD_REQUEST, ErrorConst.VALIDATION_ERROR_MSG);
        } else {
          throw err;
        }
      });
  }

  async updateMovieById(id: string, body: object, res?: Response) {
    return MovieModel.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .then(data => {
        if (data === null) {
          throw new CustomError(ErrorConst.NOT_FOUND, ErrorConst.MOVIE_NOT_FOUND);
        }
        return data;
      })
      .catch(err => {
        logger.info('[ts-mongoose][movie-repositories][updateMovieById][err] ' + err.message, res, true);
        if (err.name === 'ValidationError') {
          throw new CustomError(ErrorConst.BAD_REQUEST, ErrorConst.VALIDATION_ERROR_MSG);
        } else {
          throw err;
        }
      });
  }

  async deleteMovieById(id: string, res?: Response) {
    return MovieModel.findByIdAndDelete(id)
      .then(data => {
        if (data === null) {
          throw new CustomError(ErrorConst.NOT_FOUND, ErrorConst.MOVIE_NOT_FOUND);
        }
        return data;
      })
      .catch(err => {
        logger.info('[ts-mongoose][movie-repositories][deleteMovieById][err] ' + err.message, res, true);
        if (err.name === 'ValidationError') {
          throw new CustomError(ErrorConst.BAD_REQUEST, ErrorConst.VALIDATION_ERROR_MSG);
        } else {
          throw err;
        }
      });
  }

  async getMoviesData(filter: object, limit: number, offset: number, res?: Response) {
    return MovieModel.aggregate([
      {
        $match: filter,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: offset * limit,
      },
      {
        $limit: limit,
      },
    ])
      .then(data => {
        return data;
      })
      .catch(err => {
        logger.info('[ts-mongoose][movie-repositories][getMoviesData][err] ' + err.message, res, true);
        if (err.name === 'ValidationError') {
          throw new CustomError(ErrorConst.BAD_REQUEST, ErrorConst.VALIDATION_ERROR_MSG);
        } else {
          throw err;
        }
      });
  }

  async bulkCreateMovies(body: IMoviePopulated[], res?: Response) {
    const options = { ordered: false };
    return MovieModel.insertMany(body, options).catch(err => {
      logger.info('[ts-mongoose][movie-repositories][bulkCreateMovies][err] ' + err.message, res, true);
      if (err.code === ErrorConst.MONGO_DUPLICATE_ERROR) {
        throw new CustomError(ErrorConst.CONFLICT, ErrorConst.DUPLICATE_MOVIE);
      } else if (err.name === 'ValidationError') {
        throw new CustomError(ErrorConst.BAD_REQUEST, ErrorConst.VALIDATION_ERROR_MSG);
      } else {
        throw err;
      }
    });
  }
}
