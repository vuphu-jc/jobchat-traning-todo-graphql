import rootTypeDef from './schema/root';
import userTypeDef from './schema/user';
import commentTypeDef from './schema/comment';
import productTypeDef from './schema/product';

import commentResolver from './resolver/comment';
import productResolver from './resolver/product';

const typeDefs = [rootTypeDef, userTypeDef, commentTypeDef, productTypeDef];
const resolvers = [commentResolver, productResolver];

export { typeDefs, resolvers };
