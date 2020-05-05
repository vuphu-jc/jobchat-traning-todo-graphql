import BaseDatasource from './base';
import User from '../models/user';

export default class UserDatasource extends BaseDatasource {
  constructor() {
    super();
    this.model = User;
  }

  async addUser(userData) {
    const user = {
      _id: new mongoose.Types.ObjectId().toString(),
      username: userData.username,
      password: userData.password,
      name: userData.name,
      avatar: userData.avatar || '',
    };
    await this.model(user).save();
    return user;
  }

  async getUserById(id) {
    return this.model.findOne({ _id: id });
  }

  async getUserByUsername(username) {
    return this.model.findOne({ username: username });
  }
}
