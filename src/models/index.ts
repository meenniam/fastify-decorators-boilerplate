import { FastifyInstance } from 'fastify';
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import { connect } from 'mongoose';
import { Hello, HelloModel } from './hello';
export interface Models {
  Hello: HelloModel;
}
export interface Db {
  models: Models;
}

// define options
export interface MyPluginOptions {
  uri: string;
}
const ConnectDB: FastifyPluginAsync<MyPluginOptions> = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  try {
    // connection.on('connected', () => {
    //   fastify.log.info({ actor: 'MongoDB' }, 'connected');
    // });
    // connection.on('disconnected', () => {
    //   fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
    // });
    await connect(options.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    const models: Models = { Hello };
    fastify.decorate('db', { models });
  } catch (error) {
    console.error(error);
  }
};
export default fp(ConnectDB);
