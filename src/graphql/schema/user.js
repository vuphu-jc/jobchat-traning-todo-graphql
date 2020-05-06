import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type BasicUserInfo {
    _id: String!
    name: String
    avatar: String
  }
`;

export default typeDefs;
