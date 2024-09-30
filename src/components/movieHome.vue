<script setup>
import { ref, onMounted } from "vue";

const trendingMovies = ref([]);
const popularMovies = ref([]);
const popularTvSeries = ref([]);
const freeMovies = ref([]);
const freeTv = ref([]);
const errorMessage = ref(''); 
const currentSlide = ref(0); 
const currentSlide2 = ref(0);
const currentSlide3 = ref(0); 
const currentSlide4 = ref(0); 
const currentSlide5 = ref(0); 
const itemsPerView = 7; 
const bannerImage = ref("");

const images = [
  'https://image.tmdb.org/t/p/original/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg',
  'https://image.tmdb.org/t/p/original/5N8LOeRzt7LcZIhPbNVaCsVOPdT.jpg',//
  'https://image.tmdb.org/t/p/original/8rmx3Wh6fQdSL2nzTmdFn9thcK8.jpg',//
  'https://image.tmdb.org/t/p/original/xcXALwBjdHIjrESpGVhghqj8fGT.jpg',//
  'https://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg',//
  'https://image.tmdb.org/t/p/original/qUOJGvH8L31HL2b9Q6DGNPGCCI0.jpg',//
  'https://image.tmdb.org/t/p/original/tfw5LKySp7uEYJ3CUuD4TKx3s8y.jpg',//
  'https://image.tmdb.org/t/p/original/dKqa850uvbNSCaQCV4Im1XlzEtQ.jpg',//
  'https://image.tmdb.org/t/p/original/e3h0knvtz4qPg9dwYdWynALrW9s.jpg',//
  'https://image.tmdb.org/t/p/original/9xfDWXAUbFXQK585JvByT5pEAhe.jpg',//
  'https://image.tmdb.org/t/p/original/hoVj2lYW3i7oMd1o7bPQRZd1lk1.jpg',//
  'https://image.tmdb.org/t/p/original/46FRuCeAn6TrS4F1P4F9zhyCpyo.jpg',
  'https://image.tmdb.org/t/p/original/tt79dbOPd9Z9ykEOpvckttgYXwH.jpg',
  'https://image.tmdb.org/t/p/original/npD65vPa4vvn1ZHpp3o05A5vdKT.jpg',
  'https://image.tmdb.org/t/p/original/zZ3Cv1lz61V9OXXvtCPVtCFTVP7.jpg',
  'https://image.tmdb.org/t/p/original/xpba0Dxz3sxV3QgYLR8UIe1LAAX.jpg',
  'https://image.tmdb.org/t/p/original/9YDXLJnp2N62uicerbvK2zGhetP.jpg',
  'https://image.tmdb.org/t/p/original/u7OpeS4eckBSR1wFxFTuyy3FjHE.jpg',
  'https://image.tmdb.org/t/p/original/ctxm191q5o3axFzQsvNPlbKoSYv.jpg',
  'https://image.tmdb.org/t/p/original/u0BDggs80FG9tyZwxWTzVTDQls0.jpg',
  'https://image.tmdb.org/t/p/original/pQvqGK6KQDILL7SJrhMQsRvJfLB.jpg',
  'https://image.tmdb.org/t/p/original/SqAZjEqqBAYvyu3KSrWq1d0QLB.jpg',
  'https://image.tmdb.org/t/p/original/6UH52Fmau8RPsMAbQbjwN3wJSCj.jpg',
];

onMounted(async () => {
  bannerImage.value = images[Math.floor(Math.random() * images.length)];

  // Obtener películas en tendencia
  await fetchMovies("https://api.themoviedb.org/3/trending/all/day", trendingMovies);

  // Obtener películas populares
  await fetchMovies("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc", popularMovies);

  // Obtener TV Series populares
  await fetchMovies("https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc", popularTvSeries);

  // Obtener películas gratis
  await fetchMovies("https://api.themoviedb.org/3/discover/movie?with_watch_monetization_types=free&page=2", freeMovies);
  
  // Obtener TV gratis
  await fetchMovies("https://api.themoviedb.org/3/discover/tv?with_watch_monetization_types=free&page=2", freeTv);
});

// Función para obtener películas
const fetchMovies = async (url, movieList) => {
  try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWJiNjZjYTgxNzA5NjZkMjFmMjI4ZWJmOWI0ZmI4NCIsIm5iZiI6MTcyNzU2NTMzNC4zNDk0NjEsInN1YiI6IjY2ZjMxOGYzMDIyMDhjNjdjODhkYWM4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OKuM2RRKAdnmYI07q5zJ8f8JEg5uOuBuVYuGuOrroOg"); 

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);
      const data = await response.json(); 
      movieList.value = data.results; 
    } catch (error) {
      console.log('error', error);
      errorMessage.value = 'Hubo un problema al cargar las películas.';
    }
};


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

// adelante carrusel 2
const nextSlide2 = () => {
  if (currentSlide2.value < popularMovies.value.length - itemsPerView) {
    currentSlide2.value += itemsPerView;
  }
};

// atras carrusel 2
const prevSlide2 = () => {
  if (currentSlide2.value > 0) {
    currentSlide2.value -= itemsPerView;
  }
};

// adelante carrusel 3
const nextSlide3 = () => {
  if (currentSlide3.value < popularTvSeries.value.length - itemsPerView) {
    currentSlide3.value += itemsPerView;
  }
};

// atras carrusel 3
const prevSlide3 = () => {
  if (currentSlide3.value > 0) {
    currentSlide3.value -= itemsPerView;
  }
};

// adelante carrusel 4
const nextSlide4 = () => {
  if (currentSlide4.value < freeMovies.value.length - itemsPerView) {
    currentSlide4.value += itemsPerView;
  }
};

// atras carrusel 4
const prevSlide4 = () => {
  if (currentSlide4.value > 0) {
    currentSlide4.value -= itemsPerView;
  }
};

// adelante carrusel 5
const nextSlide5 = () => {
  if (currentSlide5.value < freeTv.value.length - itemsPerView) {
    currentSlide5.value += itemsPerView;
  }
};

// atras carrusel 5
const prevSlide5 = () => {
  if (currentSlide5.value > 0) {
    currentSlide5.value -= itemsPerView;
  }
};
</script>

<template>
  <section class="banner" :style="{ backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.75) 0%, rgba(3, 37, 65, 0.75) 100%), url(${bannerImage})` }">
    <div>
      <h1>Te damos la bienvenida.</h1>
      <h2>Millones de películas, series y gente por descrubir. Explora ya.</h2>
    </div>
  </section>
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
  <br>
  <div class="carousel-container">
    <h1>Lo más popular - Movies </h1>
    <button @click="prevSlide2" class="prev-button">&lt;</button>
    <button @click="nextSlide2" class="next-button">&gt;</button>
    <div class="carousel" v-if="popularMovies.length">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide2 * 160}px)` }">
        <div v-for="(movie, index) in popularMovies" :key="index" class="carousel-item">
          <div v-if="movie.poster_path">
            <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title || movie.name" />
          </div>
          <p>{{ movie.title || movie.name }}</p>
        </div>
      </div>
    </div>
  </div>
  <br>
  <div class="carousel-container">
    <h1>Lo más popular - TV Series </h1>
    <button @click="prevSlide3" class="prev-button">&lt;</button>
    <button @click="nextSlide3" class="next-button">&gt;</button>
    <div class="carousel" v-if="popularTvSeries.length">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide3 * 160}px)` }">
        <div v-for="(movie, index) in popularTvSeries" :key="index" class="carousel-item">
          <div v-if="movie.poster_path">
            <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title || movie.name" />
          </div>
          <p>{{ movie.title || movie.name }}</p>
        </div>
      </div>
    </div>
  </div>
  <br>
  <div class="carousel-container">
    <h1>Ver gratis - Movies</h1>
    <button @click="prevSlide4" class="prev-button">&lt;</button>
    <button @click="nextSlide4" class="next-button">&gt;</button>
    <div class="carousel" v-if="freeMovies.length">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide4 * 160}px)` }">
        <div v-for="(movie, index) in freeMovies" :key="index" class="carousel-item">
          <div v-if="movie.poster_path">
            <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title || movie.name" />
          </div>
          <p>{{ movie.title || movie.name }}</p>
        </div>
      </div>
    </div>
  </div>
  <br>
  <div class="carousel-container">
    <h1>Ver gratis - TV Series</h1>
    <button @click="prevSlide5" class="prev-button">&lt;</button>
    <button @click="nextSlide5" class="next-button">&gt;</button>
    <div class="carousel" v-if="freeTv.length">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide5 * 160}px)` }">
        <div v-for="(movie, index) in freeTv" :key="index" class="carousel-item">
          <div v-if="movie.poster_path">
            <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title || movie.name" />
          </div>
          <p>{{ movie.title || movie.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos del banner */
.banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.banner h1 {
  font-size: 2.5rem;
  text-align: left;
  font-weight: bold;
}

.banner h2 {
  font-size: 1.5rem;
  text-align: left;
  font-weight: bold;
}

.carousel-container {
  width: 200%;
  overflow: hidden;
  padding: 0;
  position: relative;
  margin-top: 300px;
  margin-bottom: -230px;
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