<<<<<<< HEAD
<template>
  <div class="container">
    <div class="background-image"></div>
    <div class="content">
      <h1 class="title">My Recipes</h1>
      <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to view this</router-link>
      <RecipePreviewList 
        title="Users Own Recipes" 
        :recipes="recipes" 
        class="UserRecipes center" 
      />
    </div>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "my-recipes",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      recipes: [] 
    };
  },
  mounted() {
    this.getUserRecipes();
  },
  methods: {
    async getUserRecipes() {
      try {
        if (this.$root.store.username) {
          const response = await this.axios.get(
            this.$root.store.server_domain + "/users/myRecipes",
            {
              withCredentials: true,
            }
          );
          console.log("Response data:", response.data); 
          this.recipes = response.data;
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    }
  },
};

</script>
  
  <style lang="scss" scoped>
  .container {
    position: relative;
    width: 50%;
    height: 100%;
  }
  
  .background-image {
    background: url('@/assets/Screenshot_2.jpg') center/cover;
    position: absolute;
    bottom: 0;
    left: -140px;
    width: 140%;
    height: 92%;
        z-index: -1;
  }
  
  .content {
    position: relative; /* Ensure content stays above the background */
    z-index: 1; /* Ensure content stays above the background */
  }
  
  .UserRecipes {
    margin: 10px 0 10px;
  }
  
  .blur {
    -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
    filter: blur(2px);
  }
  
  ::v-deep .blur .recipe-preview {
    pointer-events: none;
    cursor: default;
  }
  </style>
=======
<template>
  <div class="container">
    <div class="background-image"></div>
    <div class="content">
      <h1 class="title">My Recipes</h1>
      <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to view this</router-link>
      <RecipePreviewList 
        title="Users Own Recipes" 
        :recipes="recipes" 
        class="UserRecipes center" 
      />
    </div>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "my-recipes",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      recipes: [] 
    };
  },
  mounted() {
    this.getUserRecipes();
  },
  methods: {
    async getUserRecipes() {
      try {
        if (this.$root.store.username) {
          const response = await this.axios.get(
            this.$root.store.server_domain + "/users/myRecipes",
            {
              withCredentials: true,
            }
          );
          console.log("Response data:", response.data); 
          this.recipes = response.data;
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    }
  },
};

</script>
  
  <style lang="scss" scoped>
  .container {
    position: relative;
    width: 50%;
    height: 100%;
  }
  
  .background-image {
    background: url('@/assets/Screenshot_2.jpg') center/cover;
    position: absolute;
    bottom: 0;
    left: -140px;
    width: 140%;
    height: 92%;
        z-index: -1;
  }
  
  .content {
    position: relative; /* Ensure content stays above the background */
    z-index: 1; /* Ensure content stays above the background */
  }
  
  .UserRecipes {
    margin: 10px 0 10px;
  }
  
  .blur {
    -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
    filter: blur(2px);
  }
  
  ::v-deep .blur .recipe-preview {
    pointer-events: none;
    cursor: default;
  }
  </style>
>>>>>>> ff91ca2fae5dbc65bf718d104f743e79469b0291
  