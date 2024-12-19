<template>
  <b-container>
    <h3>{{title}}</h3>
    <b-col v-for="r in recipes" :key="r.recipe_id">
      <br>
      <RecipePreview class="recipePreview" :recipe="r" @click.native="viewRecipe(r.recipe_id)" />
    </b-col>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: false // נ
    },
    recipes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      page_title:" ",
      localRecipes: this.recipes 
    };
  },
  
  methods: {
    async updateRecipes() {
    // responsible for random recipes only
      try
      {
            if (this.title==="Explore these recipes"){
              const response = await this.axios.get(
              this.$root.store.server_domain + "/recipes/random",
              {
                withCredentials: true
              }
            );
            this.recipes = response.data;
            }
            else if (this.title === "Last viewed recipes")
            {
              const response = await this.axios.get(
              this.$root.store.server_domain + "/users/lastViewed",
              {
                withCredentials: true
              }
            );
            this.recipes = response.data;
            }
            else if (this.title === "Users Favorite Recipes"){
              const response = await this.axios.get(
              this.$root.store.server_domain + "/users/favorites",
              {
                withCredentials: true
              }
            );
            this.recipes = response.data;
            }
      }
      catch (error) {
        console.error("Error fetching recipes:", error);
      }        
    },
    viewRecipe(recipeId) {
      if (!recipeId) {
        console.error("Recipe ID is missing");
        return;
      }
      this.$router.push({
        name: "recipe", 
        params: { recipeId }
      });
    }

  },
  mounted() {
      this.updateRecipes(); 
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
