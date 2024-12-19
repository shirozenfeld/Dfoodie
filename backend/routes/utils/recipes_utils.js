const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const api_key="dfae693cae89440ab9807ae88961373f";

/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    try {
      // Trim any whitespace or newline characters from the recipe_id
      const cleanedRecipeId = recipe_id.trim();
      const response = await axios.get(`${api_domain}/${cleanedRecipeId}/information`, {
        params: {
          includeNutrition: false,
          apiKey: api_key
        }
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw { status: 404, message: "No results were found" };
      } else {
        throw error;
      }
    }
}


async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let {id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree,summary } = recipe_info;

    return {
        recipe_id:id,
        id: id,
        image: image,
        title: title,
        readyInMinutes: readyInMinutes,
        aggregateLikes: aggregateLikes,
        vegetarian: vegetarian,
        vegan: vegan,
        glutenFree: glutenFree,
        summary:summary
    }
}


async function searchRecipe(recipeName, cuisine, diet, intolerance, number) {
    const response = await axios.get(`${api_domain}/complexSearch`, {
        params: {
            query: recipeName,
            cuisine: cuisine,
            diet: diet,
            intolerances: intolerance,
            number: number,
            apiKey: api_key
        }
    });
    
    // Use Promise.all to fetch details for each recipe ID
    const recipeDetails = await Promise.all(response.data.results.map(element => getRecipeDetails(String(element.id))));
    return recipeDetails;

    //return getRecipeDetails(response.data.results.map((element) => element.recipe_id));
}


/**
 * Get random recipes from Spoonacular API
 * @param {number} number - Number of random recipes to fetch
 */
async function getRandomRecipes(number = 3) {
  try {
    const response = await axios.get(`${api_domain}/random`, {
      params: {
        apiKey: api_key,
        number: "3"
      }
    });
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw error;
  }
}


module.exports={
    getRecipeDetails,
    searchRecipe,
    getRecipeInformation,
    getRandomRecipes
    };
    

