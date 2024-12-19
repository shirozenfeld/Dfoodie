<template>
  <div>  
    <div style="display: flex;">
      <div style="flex: 1;">
        <br><br>
        <img src="@/assets/megan-bucknall-edyYnPwpcXQ-unsplash.jpg" style="max-width: 80%; margin-left: 20px;">
      </div>
      <div style="flex: 2; padding-left: 0px;">
        <br><br><br>
        <h1 class="carousel-slide-title"><b>Welcome to D'Foodie Recipes Website</b></h1>
        <p class="carousel-slide-text">
          Embark on a culinary adventure with us, where flavors know no bounds. Explore a diverse collection of recipes from around the world and unleash your creativity by crafting your own culinary masterpieces.
          <br>
          Discover a rich tapestry of tastes, from treasured family recipes passed down through generations to innovative creations that push the boundaries of flavor. Found a favorite dish? Save it to your personal collection and savor it whenever the craving strikes.
          <br>
          Searching for something specific? Our advanced recipe search feature allows you to explore recipes tailored to your preferences, whether it's dietary needs, culinary preferences, or ingredient restrictions.
          <br>
          Join us as we celebrate the art of cooking and the joy of sharing meals with loved ones. Bon appétit!
        </p>
      </div>
    </div>

    <div class="slide-content" style="background-color: #ffffff;">
      <div class="text-content">
        <h1>Authors: Ofek Kachlon & Shir Mordechai</h1>
        <p>
          <b-list-group-item><a class="links" href="https://github.com/shirmor" target="_blank">Shir's GitHub</a></b-list-group-item>
        </p>
        
        <p>
          <b-list-group-item><a class="links" href="https://github.com/ofekkah" target="_blank">Ofek's GitHub</a></b-list-group-item>
        </p>
        <br>
        <h1 class="shir">Shir's Responsibility: Logic & Design</h1>
        <h1 class="ofek">Ofek's Responsibility: Logic & Design</h1>
        <br>
        <p>
          <b-list-group-item><a class="links" href="https://wed-2023.github.io/207277997/" target="_blank">Shir's Preview Project</a></b-list-group-item>
        </p>
        <p>
          <b-list-group-item><a class="links" href="https://wed-2023.github.io/208590174/" target="_blank">Ofek's Preview Project</a></b-list-group-item>
        </p>
      </div>
    </div>
        
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      slide: 0,
    };
  },
};
</script>

<style scoped>
.carousel-slide-title {
  font-family: 'Segoe UI';
  font-size: 35px;
  color: #000000;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.carousel-slide-text {
  font-family: 'Segoe UI';
  font-size: 24px;
  color: #000000;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.slide-content {
  color: #000;
  padding: 40px;
  text-align: center;
}

.slide-content h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.slide-content p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.links {
  color: #89c2ff;
  text-decoration: none;
}

.links:hover {
  text-decoration: underline;
}

.shir {
  text-align: center;
}

.ofek {
  text-align: center;
}


div[caption-tag="div"] {
  font-size: 56px;
  font-family: Monaco, monospace;
}
</style>
