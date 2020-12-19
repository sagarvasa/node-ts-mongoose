import { Connection, ConnectionOptions } from 'mongoose';
import logger from '../utilities/winston';
import { createMongoConnection, closeMongoConnection } from '../datasources';
import mongodbConfig from '../config/mongodb';

class MongoConnectionHelper {
  private connectionObj: Connection | undefined;

  public async establishConnection(): Promise<Connection> {
    try {
      const { host, port, database, username, password, poolSize } = mongodbConfig;
      const options: ConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      };
      if (poolSize) {
        options['poolSize'] = poolSize;
      }
      this.connectionObj = await createMongoConnection({ host, port, database, username, password }, options);
      return this.connectionObj;
    } catch (error) {
      logger.info('[ts-mongoose] Establish connection error: ' + error.message);
      return Promise.reject(error);
    }
  }

  public async getConnection(): Promise<object> {
    try {
      if (!this.connectionObj) {
        throw new Error('Please establish connection first');
      }
      const db = this.connectionObj.db;
      return { client: this.connectionObj, db };
    } catch (err) {
      logger.info('[ts-mongoose] Get connection error: ' + err.message);
      throw err;
    }
  }

  public closeConnection(connectionObj?: Connection): void {
    try {
      if (connectionObj) {
        closeMongoConnection(connectionObj);
      }
    } catch (err) {
      logger.info('[ts-mongoose] Close connection error: ' + err.message);
    }
  }
}

export default MongoConnectionHelper;
