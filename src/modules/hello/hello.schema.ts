import { Static, Type } from '@sinclair/typebox';
import { FastifyRequest } from 'fastify';

export const HelloTypes = Type.Object({
  name: Type.String(),
  mail: Type.Optional(Type.String({ format: 'email' })),
  age: Type.Optional(Type.Number())
});

export const HelloParamsTypes = Type.Object({
  helloId: Type.String()
});

export type HelloBodyType = Static<typeof HelloTypes>;
export type HelloParamsType = Static<typeof HelloParamsTypes>;

export type HelloRequest = FastifyRequest<{
  Body: HelloBodyType;
  Params: HelloParamsType;
}>;

// schema

export const helloSchema = {
  body: HelloTypes,
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'number' }
          }
        },
        code: { type: 'number' }
      }
    }
  }
};
