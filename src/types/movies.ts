import { Document, Model } from 'mongoose';

interface Movie {
  title: string;
  release_year: string;
  locations: string;
  fun_facts?: string;
  production_company?: string;
  distributor?: string;
  director?: string;
  writer: string;
  actor_1: string;
  actor_2?: string;
  actor_3?: string;
}

export interface IMoviePopulated extends Movie {}

export interface IMovieBaseDocument extends Movie, Document {
  //virtuals and normal methods on schema goes here
}

export interface IMovieBaseModel extends Model<IMovieBaseDocument> {
  // static methods in schema goes here
}
