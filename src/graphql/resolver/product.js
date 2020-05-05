import datasources from '../../providers/datasources';
import helper from '../../utils/helper';

const resolver = {
  Query: {
    products: async (_, args, { req }) => {
      helper.route.assertAuthentication(req);
      return datasources.productDS.onRequest(req).listProducts();
    },
    product: async (_, args, { req }) => {
      helper.route.assertAuthentication(req);
      return datasources.productDS.onRequest(req).getProductById(args.id);
    },
  },
  Mutation: {
    addProduct: async (_, args, { req }) => {
      helper.route.assertAuthentication(req);
      return datasources.productDS.onRequest(req).addProduct(args.productData);
    },
    updateProduct: async (_, args, { req }) => {
      helper.route.assertAuthentication(req);
      return datasources.productDS.onRequest(req).updateProduct(args.id, args.productData);
    },
    deleteProduct: async (_, args, { req }) => {
      helper.route.assertAuthentication(req);
      return datasources.productDS.onRequest(req).deleteProduct(args.id);
    },
  },
};

export default resolver;
