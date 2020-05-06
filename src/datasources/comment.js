import BaseDatasource from './base';
import Comment from '../models/comment';
import { Types } from 'mongoose';

export default class CommentDatasource extends BaseDatasource {
  constructor() {
    super();
    this.model = Comment;
  }

  async listComments(productId) {
    return this.model.find({ productId: productId });
  }

  async addComment(productId, content) {
    const comment = {
      _id: new Types.ObjectId().toString(),
      productId: productId,
      user: {
        _id: this.req.user._id,
        name: this.req.user.name,
        avatar: this.req.user.avatar || '',
      },
      content: content,
    };

    await this.model(comment).save();
    return comment;
  }

  async updateComment(id, content) {
    const item = await this.model.findOne({ _id: id });
    if (!item) throw this.constant.error.objectIsNotExist;
    item.content = content;
    await this.model.findOneAndUpdate({ _id: id }, { $set: { content } }, { new: true });
    return item;
  }

  async deleteComment(id) {
    const res = await this.model.deleteOne({ _id: id });
    return !res.deletedCount ? false : true;
  }
}
