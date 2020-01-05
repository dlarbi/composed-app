import recipesApi from '../api/recipes-api';
import recipesStore from '../stores/recipes';

async function fetchRecipes() {
  const recipes = await recipesApi.getRecipes();
  recipesStore.setRecipesById(recipes);
  return recipes;
}

// takes a query like { key: value } OR { query: 'example search', fields: ['fields to search']}
async function search(query) {
  const recipes = await recipesApi.searchRecipes(query);
  recipesStore.setSearchedRecipeIds(recipes.map(recipe => recipe.id));
  recipesStore.setRecipesById(recipes);
  return recipes;
}

export default {
  fetchRecipes,
  search
}
