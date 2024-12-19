<<<<<<< HEAD
<template>
  <div class="container d-flex justify-content-center">
    <div class="card recipe-card" v-if="recipe" dir="rtl">
      <div class="card-header text-center recipe-header">
        <h1 class="card-title">{{ recipe.title }}</h1>
        <img :src="require(`@/assets/kolche.jpg`)" class="card-img-top" />
      </div>
      <div class="card-body recipe-body">
        <div><b>תיאור: {{ recipe.summary }} </b></div>
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><b>זמן הכנה:  {{ recipe.readyInMinutes }} דקות ⏱️</b></div>
              <div><b>לייקים: {{ recipe.popularity }}  ❤️</b></div>
              <div><b>מנות: {{ recipe.servings || '10' }} 🍽️</b></div> <!-- If servings are not available, show N/A -->
              <p v-if="recipe.vegan === 1" class="badge badge-success mt-2">Vegan 🌿</p>
              <p v-if="recipe.vegetarian === 1" class="badge badge-warning mt-2">Vegetarian 🥦</p>
              <p v-if="recipe.glutenFree === 1" class="badge badge-info mt-2">Gluten-Free 🚫🌾</p>
            </div>
            
          </div>
          <div class="wrapped">
            <b>הוראות הכנה:</b>
            <ol>
              <li v-for="(step, index) in recipe.instructionsArray" :key="index">
                {{ step }}
              </li>
            </ol>
            <b>רכיבים ({{ recipe.servings || '10' }} יחידות):</b>
            <ul>
              <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.ingredient_name }}
              </li>
            </ul>
          </div>
        </div>
        <div><img :src="recipe.image" class="card-img-bottom" /></div>
        <div class="button-container mt-4 d-flex justify-content-center">
          <b-button variant="primary" :to="{ name: 'main' }">Back to Home Page</b-button>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import family_recipe from "@/assets/mocks/family_recipes_preview.json"; // Importing the JSON file

export default {
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      // Modify the recipe structure to fit the template
      this.recipe = {
        ...family_recipe,
        instructionsArray: family_recipe.instructions.split(", "), // Convert instructions string into an array
        vegan: family_recipe.vegan === 1, // Convert to boolean
        vegetarian: family_recipe.vegetarian === 1, // Convert to boolean
        glutenFree: family_recipe.glutenFree === 1, // Convert to boolean
      };
    } catch (error) {
      console.error("Error fetching recipe:", error);
      this.$router.replace("/NotFound");
    }
  }
};
</script>

<style scoped>
.recipe-card {
  margin-top: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  width: 70%;
  direction: rtl; /* Ensure RTL layout */
  text-align: right; /* Ensure text is aligned to the right */
}

.recipe-header {
  background-color: #f8f9fa;
  padding: 20px;
}

.card-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
}

.card-img-top {
  width: 60%;
  height: auto;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.recipe-body {
  padding: 20px;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  flex-direction: row-reverse; /* Reverses the direction of the flexbox layout for RTL */
}

.wrapped {
  width: 45%;
}

ul {
  list-style: none;
  padding-right: 0;
}

li {
  padding-bottom: 5px;
}

.button-container {
  margin-top: 20px;
  text-align: center;
}

.badge {
  font-size: 14px;
}

@media (max-width: 768px) {
  .wrapper {
    flex-direction: column;
  }
  .wrapped {
    width: 100%;
    margin-bottom: 20px;
  }
}

</style>
=======
<template>
  <div class="container d-flex justify-content-center">
    <div class="card recipe-card" v-if="recipe" dir="rtl">
      <div class="card-header text-center recipe-header">
        <h1 class="card-title">{{ recipe.title }}</h1>
        <img :src="require(`@/assets/kolche.jpg`)" class="card-img-top" />
      </div>
      <div class="card-body recipe-body">
        <div><b>תיאור: {{ recipe.summary }} </b></div>
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><b>זמן הכנה:  {{ recipe.readyInMinutes }} דקות ⏱️</b></div>
              <div><b>לייקים: {{ recipe.popularity }}  ❤️</b></div>
              <div><b>מנות: {{ recipe.servings || '10' }} 🍽️</b></div> <!-- If servings are not available, show N/A -->
              <p v-if="recipe.vegan === 1" class="badge badge-success mt-2">Vegan 🌿</p>
              <p v-if="recipe.vegetarian === 1" class="badge badge-warning mt-2">Vegetarian 🥦</p>
              <p v-if="recipe.glutenFree === 1" class="badge badge-info mt-2">Gluten-Free 🚫🌾</p>
            </div>
            
          </div>
          <div class="wrapped">
            <b>הוראות הכנה:</b>
            <ol>
              <li v-for="(step, index) in recipe.instructionsArray" :key="index">
                {{ step }}
              </li>
            </ol>
            <b>רכיבים ({{ recipe.servings || '10' }} יחידות):</b>
            <ul>
              <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.ingredient_name }}
              </li>
            </ul>
          </div>
        </div>
        <div><img :src="recipe.image" class="card-img-bottom" /></div>
        <div class="button-container mt-4 d-flex justify-content-center">
          <b-button variant="primary" :to="{ name: 'main' }">Back to Home Page</b-button>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import family_recipe from "@/assets/mocks/family_recipes_preview.json"; // Importing the JSON file

export default {
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      // Safely handle the possibility of missing or undefined 'instructions'
      const instructions = family_recipe.instructions
        ? family_recipe.instructions.split(", ")
        : []; // Fallback to an empty array if instructions are not available

      // Modify the recipe structure to fit the template
      this.recipe = {
        ...family_recipe,
        instructionsArray: instructions, // Use the safely split instructions array
        vegan: family_recipe.vegan === 1, // Convert to boolean
        vegetarian: family_recipe.vegetarian === 1, // Convert to boolean
        glutenFree: family_recipe.glutenFree === 1, // Convert to boolean
      };
    } catch (error) {
      console.error("Error fetching recipe:", error);
      this.$router.replace("/NotFound");
    }
  }
};
</script>


<style scoped>
.recipe-card {
  margin-top: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  width: 70%;
  direction: rtl; /* Ensure RTL layout */
  text-align: right; /* Ensure text is aligned to the right */
}

.recipe-header {
  background-color: #f8f9fa;
  padding: 20px;
}

.card-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
}

.card-img-top {
  width: 60%;
  height: auto;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.recipe-body {
  padding: 20px;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  flex-direction: row-reverse; /* Reverses the direction of the flexbox layout for RTL */
}

.wrapped {
  width: 45%;
}

ul {
  list-style: none;
  padding-right: 0;
}

li {
  padding-bottom: 5px;
}

.button-container {
  margin-top: 20px;
  text-align: center;
}

.badge {
  font-size: 14px;
}

@media (max-width: 768px) {
  .wrapper {
    flex-direction: column;
  }
  .wrapped {
    width: 100%;
    margin-bottom: 20px;
  }
}

</style>
>>>>>>> ff91ca2fae5dbc65bf718d104f743e79469b0291
