<script setup>
import { ref, onMounted } from "vue";

const trendingMovies = ref([]);
const errorMessage = ref(''); 
const currentSlide = ref(0); 
const itemsPerView = 7; 


onMounted(async () => {
  //HOOOOOMEEE


  ///TRENDINGGG AYAYYA
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWJiNjZjYTgxNzA5NjZkMjFmMjI4ZWJmOWI0ZmI4NCIsIm5iZiI6MTcyNzQ4MzQxOC4yNDg0OTcsInN1YiI6IjY2ZjMxOGYzMDIyMDhjNjdjODhkYWM4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PPx1NhvNRGrVg-ew1jWZ-bd1ljPhaE-UiKUBJNh3vEc");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch("https://api.themoviedb.org/3/trending/all/day", requestOptions);
    const data = await response.json(); 

    trendingMovies.value = data.results;
  } catch (error) {
    console.log('error', error);
    errorMessage.value = 'Hubo un problema al cargar las películas en tendencia.';
  }
});

// adelante carrusel
const nextSlide = () => {
  if (currentSlide.value < trendingMovies.value.length - itemsPerView) {
    currentSlide.value += itemsPerView;
  }
};

// atras carrusel
const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value -= itemsPerView;
  }
};
</script>

<template>
  <div class="carousel-container">
    <h1>Tendencias</h1>

    <p v-if="errorMessage">{{ errorMessage }}</p>

    <button @click="prevSlide" class="prev-button">&lt;</button>
    <button @click="nextSlide" class="next-button">&gt;</button>

    <div class="carousel" v-if="trendingMovies.length">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 160}px)` }">
        <div
          v-for="(movie, index) in trendingMovies"
          :key="index"
          class="carousel-item"
        >
          <div v-if="movie.poster_path">
            <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title || movie.name" />
          </div>
          <p>{{ movie.title || movie.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- EZTILOS BASES PARA VER NOMAS -->
<style scoped>
.carousel-container {
  width: 200%;
  overflow: hidden;
  padding: 20px;
  position: relative;
}

.carousel {
  display: flex;
  align-items: center;
  position: relative;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  min-width: 150px;
  margin-right: 10px;
  text-align: center;
}

.carousel-item img {
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

.carousel-item img:hover {
  transform: scale(1.05);
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 24px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
}

.prev-button {
  left: 0;
}

.next-button {
  right: 0;
}
</style>
