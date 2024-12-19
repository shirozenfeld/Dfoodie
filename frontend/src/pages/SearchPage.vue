<<<<<<< HEAD
<template>
  <div class="search-container">
    <div class="search-bar">
      <input
        type="text"
        v-model="query"
        @input="onInput"
        @focus="showRecentSearches = true"
        @blur="hideRecentSearches"
        placeholder="Search for recipes..."
      />
      <ul v-if="showRecentSearches && recentSearches.length" class="recent-searches">
        <li v-for="(search, index) in recentSearches" :key="index" @mousedown="selectRecentSearch(search)">
          {{ search }}
        </li>
      </ul>
      <div class="amount-container">
        <label for="amount" class="amount-label">Number of results:</label>
        <select v-model="amount" id="amount" class="amount-input">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <button @click="searchRecipes" class="action-button">Search</button>
    </div>
    <div class="search-bar-options">
      <div class="action-buttons">
        <button @click="toggleFilters" class="action-button">{{ showFilters ? 'Hide Filters' : 'Show Filters' }}</button>
        <label for="sort" class="sort-label">Sort by:</label>
        <select v-model="sortCriteria" id="sort" class="sort-input">
          <option value="preparationTime">Preparation Time</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
    </div>
    <div class="main-content">
      <div v-if="showFilters" class="filter-toolbar">
        <h3 class="filter-title">Filters</h3>
        <div class="filters-columns">
          <!-- Cuisine Filters -->
          <div class="filter-category">
            <h4>Cuisine</h4>
            <div v-for="(cuisine, index) in cuisineOptions" :key="index" class="filter-option">
              <input type="checkbox" :id="'cuisine-' + cuisine.value" :value="cuisine.value" v-model="selectedCuisines" />
              <label :for="'cuisine-' + cuisine.value">{{ cuisine.text }}</label>
            </div>
          </div>
          <!-- Diet Filters -->
          <div class="filter-category">
            <h4>Diet</h4>
            <div v-for="(diet, index) in dietOptions" :key="index" class="filter-option">
              <input type="checkbox" :id="'diet-' + diet.value" :value="diet.value" v-model="selectedDiets" />
              <label :for="'diet-' + diet.value">{{ diet.text }}</label>
            </div>
          </div>
          <!-- Intolerance Filters -->
          <div class="filter-category">
            <h4>Intolerances</h4>
            <div v-for="(intolerance, index) in intoleranceOptions" :key="index" class="filter-option">
              <input type="checkbox" :id="'intolerance-' + intolerance.value" :value="intolerance.value" v-model="selectedIntolerances" />
              <label :for="'intolerance-' + intolerance.value">{{ intolerance.text }}</label>
            </div>
          </div>
        </div>
      </div>
      <b-container class="recipes-container">
        <b-row v-for="r in sortedRecipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
import { mockSearchRecipes } from "../services/recipes.js";
import { cuisineOptions, dietOptions, intoleranceOptions } from "../assets/filters.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  data() {
    return {
      query: "",
      recipes: [],
      amount: 5,
      selectedCuisines: [],
      selectedDiets: [],
      selectedIntolerances: [],
      cuisineOptions,
      dietOptions,
      intoleranceOptions,
      showFilters: false,
      sortCriteria: "preparationTime",
      recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || [],
      showRecentSearches: false,
    };
  },
  mounted() {
    this.query = this.$route.query.q || ''; // Initialize with the query from route
    if (this.query.trim() !== '') {
      this.searchRecipes(); // Perform search immediately if query is present
    }
  },
  computed: {
    sortedRecipes() {
      if (this.sortCriteria === "preparationTime") {
        return [...this.recipes].sort((a, b) => a.preparationTime - b.preparationTime);
      } else if (this.sortCriteria === "popularity") {
        return [...this.recipes].sort((a, b) => b.popularity - a.popularity);
      }
      return this.recipes;
    }
  },
  methods: {
    async searchRecipes() {
      if (this.query.trim() === "") return;
      this.updateRecentSearches(this.query);
      try {
        
        const response = await this.axios.get(
        this.$root.store.server_domain + "/recipes/search",
        {
          params: {
          recipeName: this.query,
          cuisine: this.selectedCuisines,
          diet: this.selectedDiets,
          intolerance: this.selectedIntolerances,
          number: this.amount,
            }
          }
        );
        this.recipes = response.data;
        
        // const response = await mockSearchRecipes(
        //   this.query,
        //   this.amount,
        //   this.selectedCuisines,
        //   this.selectedDiets,
        //   this.selectedIntolerances
        // );
        // const recipes = response.data.recipes;
        // this.recipes = [];
        // this.recipes.push(...recipes);
      } 
      catch (error) 
      {
        console.log(error);
      }
    },
    updateRecentSearches(query) {
      if (!this.recentSearches.includes(query)) {
        this.recentSearches.unshift(query);
        if (this.recentSearches.length > 5) {
          this.recentSearches.pop();
        }
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
      }
    },
    selectRecentSearch(search) {
      this.query = search;
      this.searchRecipes();
      this.showRecentSearches = false;
    },
    onInput() {
      this.showRecentSearches = true;
    },
    hideRecentSearches() {
      setTimeout(() => {
        this.showRecentSearches = false;
      }, 200); // Delay to allow clicking on recent searches
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
  },
};
</script>
<style scoped>
.search-container {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-bar input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
}

.amount-container {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.amount-label {
  margin-right: 5px;
  font-size: 16px;
}

.amount-input {
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
}

.action-buttons {
  display: flex;
  align-items: center;
}

.sort-label {
  margin-right: 5px;
  font-size: 16px;
}

.sort-input {
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  margin-left: 10px;
}

.filter-toggle {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.filter-toggle button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 10px;
  background: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-toggle button:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.action-button,
.sort-input {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 10px;
  background: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.action-button:hover,
.sort-input:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.main-content {
  display: flex;
  position: relative;
}

.recipes-container {
  flex: 3;
}

.filter-toolbar {
  flex: 1;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-right: 20px;
}

.filter-title {
  margin-bottom: 20px;
  font-size: 30px;
  color: #333;
  text-align: center;
}

.filters-columns {
  display: flex;
  justify-content: space-between;
}

.filter-category {
  flex: 1;
  margin-right: 30px;
}

.filter-category:last-child {
  margin-right: 0;
}

.filter-category h4 {
  margin-bottom: 10px;
}

.filter-option {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.filter-option input[type="checkbox"] {
  margin-right: 10px;
}

.filter-option label {
  font-size: 14px;
}

.recent-searches {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0 0 10px 10px;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
}

.recent-searches li {
  padding: 10px;
  cursor: pointer;
}

.recent-searches li:hover {
  background-color: #f1f1f1;
}

.recipePreview {
  width: 500px; /* Smaller width for the recipe preview */
}
=======
<template>
  <div class="search-container">
    <div class="search-bar">
      <input
        type="text"
        v-model="query"
        @input="onInput"
        @focus="showRecentSearches = true"
        @blur="hideRecentSearches"
        placeholder="Search for recipes..."
      />
      <ul v-if="showRecentSearches && recentSearches.length" class="recent-searches">
        <li v-for="(search, index) in recentSearches" :key="index" @mousedown="selectRecentSearch(search)">
          {{ search }}
        </li>
      </ul>
      <div class="amount-container">
        <label for="amount" class="amount-label">Number of results:</label>
        <select v-model="amount" id="amount" class="amount-input">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <button @click="searchRecipes" class="action-button">Search</button>
    </div>
    <div class="search-bar-options">
      <div class="action-buttons">
        <button @click="toggleFilters" class="action-button">{{ showFilters ? 'Hide Filters' : 'Show Filters' }}</button>
        <label for="sort" class="sort-label">Sort by:</label>
        <select v-model="sortCriteria" id="sort" class="sort-input">
          <option value="preparationTime">Preparation Time</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
    </div>
    <div class="main-content">
      <div v-if="showFilters" class="filter-toolbar">
        <h3 class="filter-title">Filters</h3>
        <div class="filters-columns">
          <!-- Cuisine Filters -->
          <div class="filter-category">
            <h4>Cuisine</h4>
            <div v-for="(cuisine, index) in cuisineOptions" :key="index" class="filter-option">
              <input type="checkbox" :id="'cuisine-' + cuisine.value" :value="cuisine.value" v-model="selectedCuisines" />
              <label :for="'cuisine-' + cuisine.value">{{ cuisine.text }}</label>
            </div>
          </div>
          <!-- Diet Filters -->
          <div class="filter-category">
            <h4>Diet</h4>
            <div v-for="(diet, index) in dietOptions" :key="index" class="filter-option">
              <input type="checkbox" :id="'diet-' + diet.value" :value="diet.value" v-model="selectedDiets" />
              <label :for="'diet-' + diet.value">{{ diet.text }}</label>
            </div>
          </div>
          <!-- Intolerance Filters -->
          <div class="filter-category">
            <h4>Intolerances</h4>
            <div v-for="(intolerance, index) in intoleranceOptions" :key="index" class="filter-option">
              <input type="checkbox" :id="'intolerance-' + intolerance.value" :value="intolerance.value" v-model="selectedIntolerances" />
              <label :for="'intolerance-' + intolerance.value">{{ intolerance.text }}</label>
            </div>
          </div>
        </div>
      </div>
      <b-container class="recipes-container">
        <b-row v-for="r in sortedRecipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview";
import { mockSearchRecipes } from "../services/recipes.js";
import { cuisineOptions, dietOptions, intoleranceOptions } from "../assets/filters.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  data() {
    return {
      query: "",
      recipes: [],
      amount: 5,
      selectedCuisines: [],
      selectedDiets: [],
      selectedIntolerances: [],
      cuisineOptions,
      dietOptions,
      intoleranceOptions,
      showFilters: false,
      sortCriteria: "preparationTime",
      recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || [],
      showRecentSearches: false,
    };
  },
  mounted() {
    this.query = this.$route.query.q || ''; // Initialize with the query from route
    if (this.query.trim() !== '') {
      this.searchRecipes(); // Perform search immediately if query is present
    }
  },
  computed: {
    sortedRecipes() {
      if (this.sortCriteria === "preparationTime") {
        return [...this.recipes].sort((a, b) => a.preparationTime - b.preparationTime);
      } else if (this.sortCriteria === "popularity") {
        return [...this.recipes].sort((a, b) => b.popularity - a.popularity);
      }
      return this.recipes;
    }
  },
  methods: {
    async searchRecipes() {
      if (this.query.trim() === "") return;
      this.updateRecentSearches(this.query);
      try {
        
        const response = await this.axios.get(
        this.$root.store.server_domain + "/recipes/search",
        {
          params: {
          recipeName: this.query,
          cuisine: this.selectedCuisines,
          diet: this.selectedDiets,
          intolerance: this.selectedIntolerances,
          number: this.amount,
            }
          }
        );
        this.recipes = response.data;
        
        // const response = await mockSearchRecipes(
        //   this.query,
        //   this.amount,
        //   this.selectedCuisines,
        //   this.selectedDiets,
        //   this.selectedIntolerances
        // );
        // const recipes = response.data.recipes;
        // this.recipes = [];
        // this.recipes.push(...recipes);
      } 
      catch (error) 
      {
        console.log(error);
      }
    },
    updateRecentSearches(query) {
      if (!this.recentSearches.includes(query)) {
        this.recentSearches.unshift(query);
        if (this.recentSearches.length > 5) {
          this.recentSearches.pop();
        }
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
      }
    },
    selectRecentSearch(search) {
      this.query = search;
      this.searchRecipes();
      this.showRecentSearches = false;
    },
    onInput() {
      this.showRecentSearches = true;
    },
    hideRecentSearches() {
      setTimeout(() => {
        this.showRecentSearches = false;
      }, 200); // Delay to allow clicking on recent searches
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
  },
};
</script>
<style scoped>
.search-container {
  padding: 20px;
  max-width: 1000px;
  margin: auto;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-bar input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
}

.amount-container {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.amount-label {
  margin-right: 5px;
  font-size: 16px;
}

.amount-input {
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
}

.action-buttons {
  display: flex;
  align-items: center;
}

.sort-label {
  margin-right: 5px;
  font-size: 16px;
}

.sort-input {
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  margin-left: 10px;
}

.filter-toggle {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.filter-toggle button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 10px;
  background: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-toggle button:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.action-button,
.sort-input {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 10px;
  background: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.action-button:hover,
.sort-input:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.main-content {
  display: flex;
  position: relative;
}

.recipes-container {
  flex: 3;
}

.filter-toolbar {
  flex: 1;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-right: 20px;
}

.filter-title {
  margin-bottom: 20px;
  font-size: 30px;
  color: #333;
  text-align: center;
}

.filters-columns {
  display: flex;
  justify-content: space-between;
}

.filter-category {
  flex: 1;
  margin-right: 30px;
}

.filter-category:last-child {
  margin-right: 0;
}

.filter-category h4 {
  margin-bottom: 10px;
}

.filter-option {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.filter-option input[type="checkbox"] {
  margin-right: 10px;
}

.filter-option label {
  font-size: 14px;
}

.recent-searches {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0 0 10px 10px;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
}

.recent-searches li {
  padding: 10px;
  cursor: pointer;
}

.recent-searches li:hover {
  background-color: #f1f1f1;
}

.recipePreview {
  width: 500px; /* Smaller width for the recipe preview */
}
>>>>>>> ff91ca2fae5dbc65bf718d104f743e79469b0291
</style>