import { Service } from 'fastify-decorators';
interface IProfile {
  name: string;
  age: number;
}

const profile: IProfile = {
  name: 'test',
  age: 30
};

@Service()
export default class HelloService {
  getProfile = (name: string): IProfile => ({ ...profile, name });
}
