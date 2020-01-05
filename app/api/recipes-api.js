import _ from 'lodash';
import { COMPOSED_API_URL } from '../constants/constants';

const getRecipes = async () => {
  const recipes = await fetch(`${COMPOSED_API_URL}/recipes`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.Items;
    });
  return recipes;
};

const searchRecipes = async (query) => {
  const recipes = await fetch(`${COMPOSED_API_URL}/recipes/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query)
  }).then((response) => response.json())
    .then((responseJson) => {
      if (!_.get(responseJson, 'hits.hits')) {
        return []
      }
      const result = responseJson.hits.hits.map(hit => hit._source);
      return result;
    });
  return recipes;
};

export default {
  getRecipes,
  searchRecipes
};
