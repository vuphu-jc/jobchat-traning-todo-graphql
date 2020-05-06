import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Comment {
    _id: String!
    productId: String!
    user: BasicUserInfo!
    content: String
  }

  extend type Query {
    listComments(productId: String!): [Comment]
  }

  extend type Mutation {
    addComment(productId: String!, content: String): Comment
    updateComment(id: String!, content: String): Comment
    deleteComment(id: String!): Boolean
  }
`;

export default typeDefs;
