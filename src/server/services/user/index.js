import service from 'feathers-waterline';
import User from './model';
import { before, after } from './hooks';
import ORM from '../configs/orm';

const ENDPOINT = '/users';

// TODO: Requires get, find, create
export default function init() {
  const app = this;

  ORM.loadCollection(User);

  const options = {
    Model: User,
    paginate: {
      default: 5,
      max: 25,
    },
  };

  app.use(ENDPOINT, service(options));

  const userService = app.service(ENDPOINT);

  userService.before(before);
  userService.after(after);
}
