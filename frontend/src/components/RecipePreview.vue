<template>
  <div class="recipe-preview">
    <div @click="navigateToViewPage(recipe.id)">
      <img
        :src="recipe.image"
        class="recipe-image"
        @mouseover="showHoverEffect"
        @mouseout="hideHoverEffect"
      />
      <div v-if="hovered" class="image-hover">Click to view recipe</div>
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>

      <ul class="recipe-overview">
        <li v-if="recipe.vegan">
          <img
            src="@/assets/veganLogo.png"
            alt="Vegan"
            class="diet-logo"
          />
        </li>
        <li v-if="recipe.vegetarian" class="vegetarian">
          <img
            src="@/assets/vegetarianism-vegan-friendly-veganism-logo-brand-vegetarian-logo-removebg-preview (1).png"
            alt="Vegetarian"
            class="diet-logo"
          />
        </li>
        <li v-if="recipe.glutenFree === false">
          <img
            src="@/assets/glutenfree-removebg-preview.png"
            alt="Contains Gluten"
            class="diet-logo"
          />
        </li>
      </ul>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
      </ul>
      <div class="recipe-actions">
        <button
          :disabled="isButtonDisabled()"
          @click.stop="toggleFavorite($event, recipe.recipe_id)"
          :class="{ 'enabled-button': isButtonEnabled, 'disabled-button': !isButtonEnabled }"
          class="favorite-button"
        >
          Add to favorites
          <i v-if="isFavorite" class="fas fa-heart heart-icon-filled"></i>
          <i v-else class="far fa-heart heart-icon-unfilled"></i>
        </button>
        <span v-if="viewed" class="viewed-indicator">Viewed</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipePreview",
  data() {
    return {
      hovered: false,
      isFavorite: localStorage.getItem(`favorite_${this.recipe.id}`) === 'true',
      isButtonEnabled: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
      // validator(value) {
      //   return value && value.id && value.title && value.image;
      // }
    }
  },
  computed: {
    viewed() {
      return localStorage.getItem(`viewed_${this.recipe.id}`) === 'true';
    },
  },
  methods: {
    navigateToViewPage(recipeid)
    {
      if(recipeid){
        this.$router.push({name: 'recipe', params: { recipeId: recipeid }})
      }
    },
    async like(recipeId) {
      
      // The value is already a number
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
        this.$root.store.server_domain +"/users/favorites",
        {
          recipeId:  recipeId,
        }
        );
        this.isButtonEnabled = true;
        return response;
      } catch (err) {
        console.log(err.response);
      }
    }
    ,isButtonDisabled(){
      if (this.isButtonEnabled===true || this.$route.name === 'favorite-recipes')
      {
       return true; 
      }
      return false;
    }
    ,showHoverEffect() {
      this.hovered = true;
    },
    hideHoverEffect() {
      this.hovered = false;
    },
    markAsViewed() {
      this.viewed = true;
      localStorage.setItem(`viewed_${this.recipe.id}`, 'true');
    },
    toggleFavorite(event,recipeId) {
      event.stopPropagation();
      this.isFavorite = !this.isFavorite;
      localStorage.setItem(`favorite_${this.recipe.id}`, this.isFavorite.toString());
      
      if (this.isFavorite==true) {

        // const response = this.like(this.$route.params.recipeId);
        const response = this.like(recipeId);
        // const response = this.like(this.$route.params.recipeId);
        
        if (response) {
          this.$bvToast.toast("Successfully added to favorites", {
            title: 'Notification',
            autoHideDelay: 5000,
            toaster: 'b-toaster-bottom-right',
            appendToast: true,
            variant: 'success'
          });
        } 
      } 
    }
  },
  
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
  border-radius: 10px;
  overflow: hidden; /* Ensure rounded corners are respected */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  transition: background-color 0.3s ease; /* Smooth transition for background color */
}

.recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.image-hover {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  opacity: 0.8;
  pointer-events: none;
}

.recipe-footer {
  padding: 10px;
  background-color: #f9f9f9;
}

.recipe-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-overview {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
  display: flex;
  justify-content: space-between;
}

.recipe-overview li {
  flex: 1;
  text-align: center;
}

.recipe-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.favorite-button {
  padding: 20px 20px; /* Adjust padding for larger size */
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 10px; /* Adjust border-radius for rounded corners */
  cursor: pointer;
  font-size: 1em; /* Adjust font size for larger button */
}
.favorite-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.enabled-button {
  background-color: #28a745; /* צבע ירוק כאשר הכפתור מופעל */
}

.disabled-button {
  background-color: #007bff; /* הצבע הרגיל של הכפתור כאשר הוא לא מופעל */
}

.recipe-actions button {
  padding: 5px 10px;
  border: none;
  background-color: #f8b9b9;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.recipe-actions .viewed-indicator {
  font-size: 16px;
  color: #28a745;
}

.diet-logo {
  width: 60px; /* Adjust size as needed */
  height: 60px; /* Adjust size as needed */
  margin-left: 5px; /* Adjust spacing as needed */
}

/* Heart icon colors */
.heart-icon-filled {
  color: rgb(255, 0, 0); /* Change color as needed */
}

.heart-icon-unfilled {
  color: inherit; /* Inherit parent's color */
}
</style>
