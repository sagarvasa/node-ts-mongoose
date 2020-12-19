import { Schema, model } from 'mongoose';
import { IMovieBaseDocument, IMovieBaseModel } from '../types';

var movieSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      index: false, //setting individual index to false
    },
    releaseYear: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /\d{4}/.test(v);
        },
        message: (props: any) => `${props.value} is not a valid year`,
      },
    },
    locations: {
      type: String,
      required: true,
      index: false,
    },
    funFacts: {
      type: String,
    },
    productionCompany: {
      type: String,
    },
    distributor: {
      type: String,
    },
    director: {
      type: String,
      lowercase: true,
    },
    writer: {
      type: String,
      required: true,
      trim: true,
    },
    actor1: {
      type: String,
      required: true,
      trim: true,
    },
    actor2: {
      type: String,
    },
    actor3: {
      type: String,
    },
  },
  { timestamps: true, strict: false },
);

movieSchema.index({ title: 1, locations: 1 });
movieSchema.index({ releaseYear: -1 });
movieSchema.index({ createdAt: -1 });

movieSchema.pre<IMovieBaseDocument>('save', function (next) {
  MovieModel.count(function (err: Error, count: number) {
    console.log('Err states before saving: ' + err);
    console.log('no of document before saving: ' + count);
    next();
  });
});

var MovieModel = model<IMovieBaseDocument, IMovieBaseModel>('movie', movieSchema, 'movies');

export default MovieModel;
