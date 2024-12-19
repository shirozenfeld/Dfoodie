<template>
  <div id="app">
    <nav class="navbar fixed-top navbar-expand-lg">
      <div class="container-fluid">
        <!-- Enhanced Search Bar -->
        <form class="enhanced-search form-inline mr-auto" @submit.prevent="goToSearch">
          <div class="search-wrapper">
            <input class="form-control form-control-search" type="search" placeholder="Search recipes..." v-model="searchQuery" aria-label="Search">
            <button type="submit" class="btn btn-search">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </form>

        <!-- Logo in the center -->
        <router-link to="/" class="navbar-brand mx-auto">
          <img src="@/assets/logonavbar.png" alt="Logo" class="navbar-logo">
        </router-link>

        <!-- Center-aligned Navbar Links -->
        <div class="navbar-nav" >
          <!-- <ul class="navbar-nav"> -->
            <router-link :to="{ name: 'main' }" class="nav-link">All Recipes</router-link>
            <router-link :to="{ name: 'about' }" class="nav-link">About</router-link>
            <!-- If the user is logged in -->
            <template v-if="$root.store.username">
              <!-- Dropdown for Personal Region -->
              <b-nav-item-dropdown right>
                <template #button-content>
                  Personal Region
                </template>
                <b-dropdown-item :to="{ name: 'favorite-recipes' }" class="custom-dropdown-item">Favorite Recipes</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'my-recipes' }" class="custom-dropdown-item">My Recipes</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'family-recipes' }" class="custom-dropdown-item">My Family Recipes</b-dropdown-item>
              </b-nav-item-dropdown>
            
              <!-- Create New Recipe Link -->
              <a @click="openModal" class="nav-link create-recipe-link">Create New Recipe</a>
            
              <!-- Logout Dropdown -->
              <b-nav-item-dropdown right>
                <template #button-content>
                  Hello {{ $root.store.username }}
                </template>
                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
              </b-nav-item-dropdown>
            </template>

            <!-- If the user is not logged in -->
            <template v-else>
              <!-- Register Link -->
              <!-- <li> -->
                <router-link :to="{ name: 'register' }" class="btn-link">Register</router-link>
              <!-- </li> -->
              <!-- Login Link -->
              <!-- <li> -->
                <router-link :to="{ name: 'login' }" class="btn-link">Log In</router-link>
              <!-- </li> -->
            </template>
          <!-- </ul> -->
        </div>
      </div>
    </nav>
    
    <NewRecipeModal ref="NewRecipeModal"></NewRecipeModal>
    <div class="background-image"></div>
    <router-view />
  </div>
</template>


<script>
import '@fortawesome/fontawesome-free/css/all.min.css';
import NewRecipeModal from './components/NewRecipeModal.vue';
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    async logout() {
      try {
        const response = await this.axios.post(this.$root.store.server_domain +"/Logout");
        if (response) {
          this.$root.store.logout();
          this.$router.push("/").catch(() => {
          this.$forceUpdate();
      });
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
    goToSearch() {
      if (this.searchQuery.trim() !== '') {
        this.$router.push({ name: 'search', query: { q: this.searchQuery } });
      }
    },
    openModal() {
      this.$refs.NewRecipeModal.openModal();
    }
  },
  components: {
    NewRecipeModal,
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: 'Segoe UI';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1b1919;
  min-height: 100vh;
  padding-top: 100px;
  background-image: url('@/assets/mae-mu-ppOPjqAJ3Mw-unsplash.jpg');
  background-size: cover;
  background-position: center;
}

.navbar {
  font-family: 'Segoe UI';
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.137);
  backdrop-filter: blur(10px);
  height: 90px;
  width: 100%;
  color: #f3eeee; /* Main text color for navbar */
}

.navbar-nav {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.navbar-brand {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -55px; 
}
.navbar-logo {
  height: 200px; /* Adjust the height as needed */
}

a.btn-link {
  color: #ffffff;
}

.nav-link {
  color: #ffffff;
  margin-left: 15px;
  margin-right: 15px;
  justify-content: space-between;
  margin:5px;
}

.btn-link {
    font-weight: 400;
    color: #fff;
    text-decoration: none;
    background-color: transparent;
    border: 2px solid #ffffff;
    border-radius: 20px;
    display: inline-block;
    margin: 5px;
    padding: 5px 15px;

}

.enhanced-search {
  position: relative;
  margin-right: auto; 
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 20px; /* Rounded corners */
  overflow: hidden; 
}

.btn-search {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #ffffff;
  padding: 8px;
}


.custom-dropdown-item {
  color: #ffffff 
}
.nav-link {
  cursor: pointer;
}


</style>
