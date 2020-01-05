class RecipesStore {
  constructor() {
    this.recipesById = {};
    this.searchedRecipeIds = [];
  }
  setRecipesById(recipes) {
    console.log(recipes)
    const newRecipesById= recipes.reduce((recipesById, recipe) => {
      recipesById[recipe.id] = recipe;
      return recipesById;
    }, {});
    this.recipesById = Object.assign({}, this.recipesById, newRecipesById);
    return this.recipesById;
  }
  setSearchedRecipeIds(ids) {
    this.searchedRecipeIds = ids;
  }
  getSearchedRecipes() {
    return this.searchedRecipeIds.map(id => this.recipesById[id]);
  }
  getRecipesById() {
    return this.recipesById;
  }
  getRecipes() {
    return Object.keys(this.recipesById).map(key => this.recipesById[key]);
  }
}

const recipesStore = new RecipesStore();
export default recipesStore;
