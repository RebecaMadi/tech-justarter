import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLFloat } from 'graphql';

const MovementType = new GraphQLObjectType({
  name: 'Movement',
  fields: () => ({
    date: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const PartyType = new GraphQLObjectType({
  name: 'Party',
  fields: () => ({
    name: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

export const ProcessType = new GraphQLObjectType({
  name: 'Process',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    distributionDate: { type: GraphQLString },
    movements: { type: new GraphQLList(MovementType) },
    parties: { type: new GraphQLList(PartyType) },
    caseValue: { type: GraphQLFloat },
    court: { type: GraphQLString },
    instance: { type: GraphQLString },
    type: { type: GraphQLString },
  }),
});
