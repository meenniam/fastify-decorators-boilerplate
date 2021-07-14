import { Controller, GET } from 'fastify-decorators';

@Controller({ route: '/test' })
export default class FirstController {
    @GET({ url: '/' })
    async helloHandler() {
        return 'Testing!';
    }

    @GET({ url: '/goodbye' })
    async goodbyeHandler() {
        return 'Test Bye-bye!';
    }
}
