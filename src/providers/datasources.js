import CommentDatasource from '../datasources/comment';
import ProductDatasource from '../datasources/product';
import UserDatasource from '../datasources/user';

export default {
  commentDS: new CommentDatasource(),
  productDS: new ProductDatasource(),
  userDs: new UserDatasource(),
};
