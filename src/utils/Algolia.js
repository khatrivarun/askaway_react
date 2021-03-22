import algoliasearch from 'algoliasearch';
import algoliaKeys from './../config/algolia';

const algoliaClient = algoliasearch(
  algoliaKeys.applicationId,
  algoliaKeys.searchOnlyApiKey
);

export const questionsIndex = algoliaClient.initIndex('questions');
export const usersIndex = algoliaClient.initIndex('users');
