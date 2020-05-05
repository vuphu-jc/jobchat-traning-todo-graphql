import { UserInputError } from 'apollo-server';
import constant from '../utils/constant';

class BaseService {
  constructor() {
    this.constant = constant;
  }

  onRequest(req) {
    this.req = req;
    return this;
  }

  onResponse(res) {
    this.res = res;
    return this;
  }
}

export default BaseService;
