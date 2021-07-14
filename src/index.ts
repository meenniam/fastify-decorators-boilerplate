import fastify, { FastifyInstance, FastifyReply } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { bootstrap } from 'fastify-decorators';
import { resolve } from 'path';
import fastifyPrintRoutes from 'fastify-print-routes';
import fastifySensible from 'fastify-sensible';
import fastifyCors from 'fastify-cors';
import fastifyHelmet from 'fastify-helmet';

import { Db } from './models';

import db from './models';

import * as dotenv from 'dotenv';
import 'reflect-metadata';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/TMS';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

declare module 'fastify' {
  interface IResponseReturn {
    data: any;
    code: number;
    reply: FastifyReply;
  }
  export interface FastifyInstance {
    // eslint-disable-next-line
    responseFormat: (reply: FastifyReply, data: any, code?: number) => IResponseReturn;
    db: Db;
  }
}

export const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: isDevelopment,
  ignoreTrailingSlash: true
});

server.register(fastifySensible);

server.register(fastifyPrintRoutes);

server.register(fastifyCors);

server.register(fastifyHelmet);

server.register(db, { uri });

server.register(
  async (instance: FastifyInstance) => {
    instance.register(bootstrap, {
      // Specify directory with our controllers
      directory: resolve(__dirname, 'modules'),

      // Specify mask to match only our controllers
      mask: /\.controller\./
    });
  },
  { prefix: '/v1' }
);

server.decorate('responseFormat', function (reply: FastifyReply, data: any, code: number = 200) {
  reply.code(code).send({ data, code });
});

server.listen(8080, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
