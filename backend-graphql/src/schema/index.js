import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { ProcessType } from './types/Process/typeDefs';
import { searchQuery,  searchQueryId} from './types/Process/queries';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    search: searchQuery,
    searchbyid: searchQueryId,
  }),
});

const schema = new GraphQLSchema({
  query: QueryType,
  ProcessType,
});

export default schema;
