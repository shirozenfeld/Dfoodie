// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


export function mockGetRecipesPreview(amount = 1) {
  const recipeIds = Object.keys(recipe_preview);
  const totalRecipes = recipeIds.length;
  let i = recipeIds.length;
  while (--i > 0) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = recipeIds[j];
    recipeIds[j] = recipeIds[i];
    recipeIds[i] = temp;
  }

  const selectedRecipes = [];
  let recipesAdded = 0;
  
  while (recipesAdded < amount) {
    const remaining = amount - recipesAdded;
    const toAdd = Math.min(remaining, totalRecipes);
    
    for (let i = 0; i < toAdd; i++) {
      const recipeId = recipeIds[i];
      selectedRecipes.push(recipe_preview[recipeId]);
    }
    
    recipesAdded += toAdd;
  }

  return { data: { recipes: selectedRecipes } };
}



export function mockGetRecipeFullDetails(recipeId) {
  const recipe = recipe_full_view[recipeId];

  if (!recipe) {
    throw new Error(`Recipe with ID ${recipeId} not found`);
  }

  return { data: { recipe } };
}

export function mockSearchRecipes(query, amount, selectedCuisines, selectedDiets, selectedIntolerances) {
  return mockGetRecipesPreview(amount);
}

export function mockGetSpecificRecipePreview(recipeId) {
    return recipe_preview[recipeId];
}