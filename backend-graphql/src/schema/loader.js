import fs from 'fs';
import path from 'path';
import { GraphQLString } from 'graphql';

const loadSchemaFields = (typesDir) => {
  let aggregatedTypes = {};
  let aggregatedQueries = {};
  let aggregatedMutations = {};

  const typeFolders = fs.readdirSync(typesDir).filter((folder) => {
    const folderPath = path.join(typesDir, folder);
    return fs.statSync(folderPath).isDirectory();
  });

  typeFolders.forEach((typeFolder) => {
    const typeIndexPath = path.join(typesDir, typeFolder, 'index.js');

    if (fs.existsSync(typeIndexPath)) {
      try {
        const typeModule = require(typeIndexPath).default;

        // Agregando tipos
        if (typeModule?.typeDefs) {
          aggregatedTypes = { ...aggregatedTypes, ...typeModule.typeDefs };
        }

        // Agregando queries
        if (typeModule?.queries) {
          aggregatedQueries = { ...aggregatedQueries, ...typeModule.queries };
        }
      } catch (error) {
        console.error(`Erro ao carregar o type "${typeFolder}":`, error);
      }
    }
  });

  return { aggregatedTypes, aggregatedQueries, aggregatedMutations };
};

const addDefaultField = (fields, defaultMessage) => {
  if (Object.keys(fields).length === 0) {
    return {
      _empty: {
        type: GraphQLString,
        resolve: () => defaultMessage,
      },
    };
  }
  return fields;
};

const typesDirectory = path.join(__dirname, 'types');
const { aggregatedTypes, aggregatedQueries, aggregatedMutations } = loadSchemaFields(typesDirectory);

const types = Object.values(aggregatedTypes);
const queries = addDefaultField(aggregatedQueries, 'No queries available');

export { types, queries };
