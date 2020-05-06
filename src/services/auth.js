import brcypt from 'bcrypt';
import constant from '../utils/constant';
import UserDatasource from '../datasources/user';
import BaseService from './base';

export default class AuthService extends BaseService {
  constructor() {
    super();
    this.userDS = new UserDatasource();
  }

  async register(userData) {
    const user = await this.userDS.getUserByUsername(userData.username);
    if (user) {
      throw constant.error.usernameAlreadyExists;
    }

    const hashPassword = await brcypt.hash(userData.password, constant.bcrypt.saltRounds);
    userData.password = hashPassword;
    return this.userDS.addUser(userData);
  }

  async login(userData) {
    const user = await this.userDS.getUserByUsername(userData.username);
    if (!user) {
      throw constant.error.usernameIsNotExists;
    }
    let result = await brcypt.compare(userData.password, user.password);
    if (!result) {
      throw constant.error.passwordIncorrect;
    }
    return user;
  }
}
