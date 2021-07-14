import { FastifyReply, FastifyInstance } from 'fastify';
import {
  Controller,
  GET,
  POST,
  PUT,
  getInstanceByToken,
  FastifyInstanceToken,
  Inject
} from 'fastify-decorators';
import { HelloRequest, helloSchema } from './hello.schema';
import HelloService from './hello.service';

@Controller({ route: '/hello' })
export default class FirstController {
  // fastify instance
  private instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);

  // hello service
  @Inject(HelloService)
  private service!: HelloService;

  @POST({ url: '/', options: { schema: helloSchema } })
  async helloHandler(request: HelloRequest, reply: FastifyReply) {
    try {
      const { name } = request.body;
      const { Hello } = this.instance.db.models;
      const doc = new Hello({ message: 'test' });
      await doc.save();
      const profile = this.service.getProfile(name);
      return this.instance.responseFormat(reply, profile, 201);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return this.instance.httpErrors.internalServerError(error.message);
      }
    }
  }

  @GET({ url: '/goodbye' })
  async goodbyeHandler() {
    try {
      const { Hello } = this.instance.db.models;
      const doc = await Hello.find();
      return doc;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return this.instance.httpErrors.internalServerError(error.message);
      }
    }
  }

  @PUT({ url: '/' })
  async updateHelloHandler() {
    try {
      throw new Error('my Error');
    } catch (error) {
      if (error instanceof Error) {
        return this.instance.httpErrors.forbidden(error.message);
      }
    }
  }
}
