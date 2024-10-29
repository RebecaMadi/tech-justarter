import { GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';
import { ProcessType } from '../typeDefs';
const axios = require('axios');

export const searchQuery = {
  type: new GraphQLList(ProcessType),
  args: {
    query: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_, { query }) => {
    try {
      const response = await axios.get('http://localhost:9777/search-serp', {
        params: { query }, 
      });
      return response.data; 
    } catch (error) {
      console.error("Erro ao buscar processos com a query:", query, error);
      throw new Error("Não foi possível realizar a busca.");
    }
  }
}