import datasources from '../../providers/datasources';
import helper from '../../utils/helper';

const resolver = {
  Query: {
    listComments: async (_, args, { req }) => {
      helper.route.assertAuthentication(req);
      return datasources.commentDS.onRequest(req).listComments(args.productId);
    },
  },
  Mutation: {
    addComment: async (_, args, { req }) => {
      helper.route.assertAuthentication(req);
      return datasources.commentDS.onRequest(req).addComment(args.productId, args.content);
    },
    updateComment: async (_, args, { req }) => {
      helper.route.assertAuthentication(req);
      return datasources.commentDS.onRequest(req).updateComment(args.id, args.content);
    },
    deleteComment: async (_, args, { req }) => {
      helper.route.assertAuthentication(req);
      return datasources.commentDS.onRequest(req).deleteComment(args.id);
    },
  },
};

export default resolver;
