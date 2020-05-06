import BaseDatasource from './base';
import Product from '../models/product';
import { Types } from 'mongoose';

export default class ProductDatasource extends BaseDatasource {
  constructor() {
    super();
    this.model = Product;
  }

  async listProducts() {
    return this.model.find({});
  }

  async getProductById(id) {
    return this.model.findOne({ _id: id });
  }

  async addProduct(productData) {
    const product = {
      _id: new Types.ObjectId().toString(),
      name: productData.name,
      description: productData.description,
      price: productData.price,
    };
    await this.model(product).save();
    return product;
  }

  async updateProduct(id, productData) {
    const item = await this.model.findOne({ _id: id });
    if (!item) throw this.constant.error.objectIsNotExist;
    item.name = productData.name;
    item.description = productData.description;
    item.price = productData.price;
    await this.model.findOneAndUpdate(
      { _id: id },
      { $set: { name, description, price } },
      { new: true },
    );
    return item;
  }

  async deleteProduct(id) {
    const res = await this.model.deleteOne({ _id: id });
    return !res.deletedCount ? false : true;
  }
}
