// src/services/user.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


  export function mockAddFavorite(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
  }
  
  
  export function mockAddUserRecipe(recipeDetails) {
    return { status: 200, response: { data: { message: "The Recipe successfully added to My Recipes", success: true}} };

  }
  
  export function mockGetUserRecipesPreview(amount = 1,username="") {
     //when there is DB, retrieve username's recipes
    const recipeIds = Object.keys(recipe_preview);
    let recipes = [];
  
    for (let i = 0; i < amount; i++) {
      const randomId = recipeIds[Math.floor(Math.random() * recipeIds.length)];
      recipes.push(recipe_preview[randomId]);
    }
  
    return { data: { recipes: recipes } };
  }

  
 
  export function mockGetFavoriteRecipesPreview(amount = 1,username="") {
    const recipeIds = Object.keys(recipe_preview);
    let recipes = [];
  
    for (let i = 0; i < amount; i++) {
      const randomId = recipeIds[Math.floor(Math.random() * recipeIds.length)];
      recipes.push(recipe_preview[randomId]);
    }
  
    return { data: { recipes: recipes } };
  }
  
  export function mockGetFamilyRecipesPreview(amount = 1,username="") {
    const recipeIds = Object.keys(recipe_preview);
    let recipes = [];
  
    for (let i = 0; i < amount; i++) {
      const randomId = recipeIds[Math.floor(Math.random() * recipeIds.length)];
      recipes.push(recipe_preview[randomId]);
    }
  
    return { data: { recipes: recipes } };
  }
  
 