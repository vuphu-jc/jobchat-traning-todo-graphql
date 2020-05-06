import { UserInputError } from 'apollo-server';
import { camelCase } from 'lodash';

import constant from '../utils/constant';

export default class BaseDatasource {
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
