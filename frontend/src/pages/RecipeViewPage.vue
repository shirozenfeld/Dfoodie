<<<<<<< HEAD
<template>
  <div class="container d-flex justify-content-center">
    <div class="card recipe-card" v-if="recipe">
      <div class="card-header text-center recipe-header">
        <h1 class="card-title">{{ recipe.title }}</h1>
        <img :src="recipe.image" class="card-img-top" />
      </div>
      <div class="card-body recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><b>Ready in {{ recipe.readyInMinutes }} minutes ⏱️</b></div>
              <div><b>Likes: {{ recipe.aggregateLikes }} likes ❤️</b></div>
              <div><b>Servings: {{ recipe.servings }} 🍽️</b></div> 
              <p v-if="recipe.vegan" class="badge badge-success mt-2">Vegan 🌿</p>
              <p v-if="recipe.vegetarian" class="badge badge-warning mt-2">Vegetarian 🥦</p>
              <p v-if="recipe.glutenFree" class="badge badge-info mt-2">Gluten-Free 🚫🌾</p>
            </div>
            <b>Ingredients ({{ recipe.servings }} servings):</b>
            <ul>
              <li v-for="(ingredient, index) in recipe.extendedIngredients" :key="index">
                {{ ingredient.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <b>Instructions:</b>
            <ol>
              <li v-for="(step, index) in recipe.instructions" :key="index">
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
        <div class="button-container mt-4 d-flex justify-content-center">
          <b-button variant="primary" :to="{ name: 'main' }">Back to Home Page</b-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      const recipeId = this.$route.params.recipeId;
      console.log("Recipe ID from route params:", recipeId); 
      const response = await this.axios.get(
        this.$root.store.server_domain +
          "/recipes/fullview/" +
          this.$route.params.recipeId,
        {
          withCredentials: true
        }
      );
      console.log("Recipe data from server:", response.data);

      if (response.status !== 200) {
        this.$router.replace("/NotFound");
        return;
      }

      //instructions recipe
      if (response && response.data) {
        let instructions = [];
        if (response.data.analyzedInstructions && response.data.analyzedInstructions.length > 0) {
          instructions = response.data.analyzedInstructions
            .map(instruction => instruction.steps.map(step => step.step))
            .flat();
        } else if (typeof response.data.instructions === 'string') {
          instructions = response.data.instructions.split('. ').filter(Boolean);
        }

        this.recipe = {
          ...response.data,
          instructions,
        };
      } else {
        this.$router.replace("/NotFound");
      }
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
}

.wrapped {
  width: 45%;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  padding-bottom: 5px;
}

.button-container {
  margin-top: 20px;
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
    <div class="card recipe-card" v-if="recipe">
      <div class="card-header text-center recipe-header">
        <h1 class="card-title">{{ recipe.title }}</h1>
        <img :src="recipe.image" class="card-img-top" />
      </div>
      <div class="card-body recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><b>Ready in {{ recipe.readyInMinutes }} minutes ⏱️</b></div>
              <div><b>Likes: {{ recipe.aggregateLikes }} likes ❤️</b></div>
              <div><b>Servings: {{ recipe.servings }} 🍽️</b></div> 
              <p v-if="recipe.vegan" class="badge badge-success mt-2">Vegan 🌿</p>
              <p v-if="recipe.vegetarian" class="badge badge-warning mt-2">Vegetarian 🥦</p>
              <p v-if="recipe.glutenFree" class="badge badge-info mt-2">Gluten-Free 🚫🌾</p>
            </div>
            <b>Ingredients ({{ recipe.servings }} servings):</b>
            <ul>
              <li v-for="(ingredient, index) in recipe.extendedIngredients" :key="index">
                {{ ingredient.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <b>Instructions:</b>
            <ol>
              <li v-for="(step, index) in recipe.instructions" :key="index">
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
        <div class="button-container mt-4 d-flex justify-content-center">
          <b-button variant="primary" :to="{ name: 'main' }">Back to Home Page</b-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      const recipeId = this.$route.params.recipeId;
      console.log("Recipe ID from route params:", recipeId); 
      const response = await this.axios.get(
        this.$root.store.server_domain +
          "/users/fullview/" +
          this.$route.params.recipeId,
        {
          withCredentials: true
        }
      );
      console.log("Recipe data from server:", response.data);

      if (response.status !== 200) {
        this.$router.replace("/NotFound");
        return;
      }

      //instructions recipe
      if (response && response.data) {
        let instructions = [];
        if (response.data.analyzedInstructions && response.data.analyzedInstructions.length > 0) {
          instructions = response.data.analyzedInstructions
            .map(instruction => instruction.steps.map(step => step.step))
            .flat();
        } else if (typeof response.data.instructions === 'string') {
          instructions = response.data.instructions.split('. ').filter(Boolean);
        }

        this.recipe = {
          ...response.data,
          instructions,
        };
      } else {
        this.$router.replace("/NotFound");
      }
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
}

.wrapped {
  width: 45%;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  padding-bottom: 5px;
}

.button-container {
  margin-top: 20px;
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
