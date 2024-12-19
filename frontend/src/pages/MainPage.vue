<template>
  <div class="container">
    <div class="background-image"></div>
    <div class="content">
      <div class="columns">
        <div class="left-column">
          <RecipePreviewList
            ref="randomRecipesList"
            title="Explore these recipes"
            :initialRecipes="randomRecipes"
            class="RandomRecipes center"
            :username="$root.store.username"
          />
          <b-button variant="outline-primary" class="more-recipes-button" @click="fetchRandomRecipes">More Recipes</b-button>
        </div>
        <div class="right-column">
          <div class="right-column-inner">
            <template v-if="$root.store.username">
              <RecipePreviewList
                ref="lastViewedRecipesList"
                title="Last viewed recipes"
                :initialRecipes="lastViewedRecipes"
                class="LastViewedRecipes center"
                :username="$root.store.username"
              />
            </template>
            <template v-else>
              <div class="login-card-wrapper">
                <LoginPage />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "./LoginPage.vue";
import { BButton } from 'bootstrap-vue';

export default {
  components: {
    RecipePreviewList,
    //LoginPage,
    BButton
  },
  data() {
    return {
      randomRecipes: [],
      lastViewedRecipes: []
    };
  },
  mounted() {
    if (this.$root.store.username) {
      this.fetchLastViewedRecipes();
    }
    // this.fetchRandomRecipes(); // Fetch initial random recipes
  },
  methods: {
    async fetchRandomRecipes() {
      try {
        await this.$refs.randomRecipesList.updateRecipes(3);
      } catch (error) {
        console.error("Error fetching random recipes:", error);
      }
    },
    async fetchLastViewedRecipes() {
      try {
        // Fetch last viewed recipes using the RecipePreviewList's updateRecipes method
        await this.$refs.lastViewedRecipesList.updateRecipes(3);
      } catch (error) {
        console.error("Error fetching last viewed recipes:", error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 70px; /* Adjust as needed */
}

.content {
  position: relative;
  z-index: 1;
}

.RandomRecipes,
.LastViewedRecipes {
  margin: 10px 0;
}

.columns {
  display: flex;
}

.left-column,
.right-column {
  flex: 1;
  padding: 10px;
}

.right-column-inner {
  position: relative; /* Ensure relative positioning for children */
}

.more-recipes-button {
  position: absolute;
  left: 160px;
  bottom: -30px;
}

.login-card-wrapper {
  margin-top: 190px; /* Adjust top margin to move the login card up */
}

.login-card {
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  max-width: 428px;
  width: 200%;
  margin-left: 0px; /* Adjust margin-left as needed */

}
</style>

