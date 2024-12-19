<<<<<<< HEAD
import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import About from "./pages/AboutPage";


const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipeViewPage",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: '/about',
    name: "about",
    // component: () => import("./pages/AboutPage"),
    component: About,
  },
  
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/my-recipes",
    name: "my-recipes",
    component: () => import("./pages/UserRecipes"),
  },
  {
    path: "/favorite-recipes",
    name: "favorite-recipes",
    component: () => import("./pages/UserFavoriteRecipes"),
  },
  {
    path: "/family-recipes",
    name: "family-recipes",
    component: () => import("./pages/FamilyRecipes.vue"),
  },

];

export default routes;
=======
import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import About from "./pages/AboutPage";


const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipeViewPage",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: '/about',
    name: "about",
    // component: () => import("./pages/AboutPage"),
    component: About,
  },
  
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/my-recipes",
    name: "my-recipes",
    component: () => import("./pages/UserRecipes"),
  },
  {
    path: "/favorite-recipes",
    name: "favorite-recipes",
    component: () => import("./pages/UserFavoriteRecipes"),
  },
  {
    path: "/family-recipes",
    name: "family-recipes",
    component: () => import("./pages/FamilyRecipes.vue"),
  },

];

export default routes;
>>>>>>> ff91ca2fae5dbc65bf718d104f743e79469b0291
