const { signedCookie } = require("cookie-parser");
const DButils = require("./DButils");

async function markAsFavorite(username, recipe_id){
    await DButils.execQuery(`insert into FavoriteRecipes values ('${username}','${recipe_id}')`);
    
}

async function getFavoriteRecipes(username){
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where username='${username}'`);
    return recipes_id;
}


function generateRecipeId() {
  const randomId = Math.floor(Math.random() * 100000); 
  return `RU${randomId}`;
}


// Function to create a new recipe
async function createRecipe(username, title, readyInMinutes, image,summary,instructions, popularity, vegan, vegetarian, glutenFree, ingredients) {
  const recipe_id = generateRecipeId(); 
  // Insert the recipe into User_Recipes table
  await DButils.execQuery(`
    INSERT INTO User_Recipes (recipe_id, username, title, readyInMinutes, image, popularity, vegan, vegetarian, glutenFree, summary, instructions)
    VALUES ('${recipe_id}', '${username}', '${title}', ${readyInMinutes}, '${image}', ${popularity}, ${vegan}, ${vegetarian}, ${glutenFree}, '${summary}', '${instructions}')
  `);
  // Insert ingredients into extended_ingredient table
  for (let ingredient of ingredients) {
    await DButils.execQuery(`
      INSERT INTO extended_ingredient (recipe_id, username, ingredient_name, amount, unit)
      VALUES ('${recipe_id}', '${username}', '${ingredient.name}', ${ingredient.amount}, '${ingredient.unit}')
    `);
  }

  return recipe_id;
}

// Function to retrieve preview of user-created recipes
async function getUserRecipes(username) {
  try {
      const recipes = await DButils.execQuery(`SELECT * FROM User_Recipes WHERE username='${username}'`);
      if (recipes.length === 0) {
          // Handle the case where no recipes are found for the user
          return { error: 'No recipes found for this user.' };
      }
      return recipes;
  } catch (error) {
      console.error('Failed to retrieve recipes:', error);
      return { error: 'Failed to retrieve recipes.' };
  }
}

// Function to retrieve user-created recipes
async function getUserRecipeInformation(username, recipe_id) {
  try {
    const recipe = await DButils.execQuery(`
      SELECT * FROM User_Recipes 
      WHERE username='${username}' 
      AND recipe_id='${recipe_id}'` 
    );

    // console.log("Recipe data from DB:", recipe);

    if (recipe.length === 0) {
      return { error: 'Recipe does not exist for this user.' };
    }

    const ingredients = await DButils.execQuery(`
      SELECT ingredient_name, amount, unit 
      FROM extended_ingredient 
      WHERE recipe_id='${recipe_id}'`
    );

    // console.log("Ingredients data from DB:", ingredients);

    if (ingredients.length === 0) {
      recipe[0].ingredients = [];
      return { ...recipe[0], message: 'No ingredients found for this recipe.' };
    }

    recipe[0].ingredients = ingredients;
    return recipe[0];
  } catch (error) {
    console.error('Failed to retrieve recipe information:', error);
    return { error: 'Failed to retrieve recipe information.' };
  }
}

async function updateRecipeView(username,recipeId,user_recipe,spooncular_recipe)
{
  if (user_recipe==1)
    recipeId=String(recipeId)
  await DButils.execQuery(`INSERT INTO last_recipes_watched (username, recipe_id, user_recipe, spooncular_recipe) 
                         VALUES ('${username}', '${recipeId}', ${user_recipe}, ${spooncular_recipe})`);
}

async function getLastViewedRecipes(username) {
  try 
  {
    let recentRecords = await DButils.execQuery(`SELECT * FROM last_recipes_watched WHERE username = '${username}' ORDER BY created_at DESC LIMIT 3`);
    console.log(recentRecords)
    if (recentRecords.length === 0) 
      {
        // Handle the case where no last recipes are found for the user
        return { error: 'No recipes found for this user.' };
      }
    return recentRecords
  } 
  catch (error) {
      console.error('Failed to retrieve recipes:', error);
      return { error: 'Failed to retrieve recipes.' };
  }
}



exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.createRecipe = createRecipe;
exports.getUserRecipes = getUserRecipes;
exports.getUserRecipeInformation = getUserRecipeInformation;
exports.updateRecipeView = updateRecipeView;
exports.getLastViewedRecipes=getLastViewedRecipes;
