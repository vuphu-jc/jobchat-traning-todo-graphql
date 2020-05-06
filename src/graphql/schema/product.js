import { gql } from 'apollo-server-express';

const typeDefs = gql`
  input ProductInfo {
    name: String!
    description: String!
    price: Float
  }

  type Product {
    _id: String!
    name: String!
    description: String!
    price: Float
  }

  extend type Query {
    products: [Product]
    product(id: String!): Product
  }

  extend type Mutation {
    addProduct(productData: ProductInfo): Product
    updateProduct(id: String!, productData: ProductInfo): Product
    deleteProduct(id: String!): Boolean
  }
`;

export default typeDefs;
