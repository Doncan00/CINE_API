<template>
    <div>
      <h1>Películas por Categorías</h1>
      <ul v-if="categories.length">
        <li v-for="category in categories" :key="category.id">
          {{ category.name }}
        </li>
      </ul>
      <p v-else>Cargando categorías...</p>
    </div>
    <div class="movies-grid">
        <div v-for="movie in movies" :key="movie.id">
            <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
            <div class="movie-title">{{ movie.title }}</div>
            <button>Detalles</button>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        categories: [], // Aquí se almacenarán las categorías
        movies: []
      };
    },
    mounted() {
      this.fetchCategories(); // Llamada a la API cuando el componente se monte
    },
    methods: {
      fetchCategories() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTllNmRmNzc0N2VhMzBiZmQ2MmYxYjQ3M2VjYTRhYSIsIm5iZiI6MTcyNzc2NTk5NC4wMzYwOTUsInN1YiI6IjY2ZjJmNmU1YTk3ODgwMTQ4ZjNiOTE4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LukH2Lz2QzQCYoj83lK6P4fCb6ZGeeifnmusw5pS428");
  
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
  
        fetch("https://api.themoviedb.org/3/genre/movie/list", requestOptions)
          .then(response => response.json())
          .then(result => {
            this.categories = result.genres; // Almacenar las categorías
          })
          .catch(error => console.log('Error al obtener categorías', error));
      },
      mostrarPeliculas(){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTllNmRmNzc0N2VhMzBiZmQ2MmYxYjQ3M2VjYTRhYSIsIm5iZiI6MTcyNzI3NTM1Mi44NDcwMDQsInN1YiI6IjY2ZjJmNmU1YTk3ODgwMTQ4ZjNiOTE4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YI6X-bM247LYdTQisKH7KVZ-x1s_s1Pj1EOFwiMyp-Q");

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch("https://api.themoviedb.org/3/discover/movie", requestOptions)
            .then(response => response.json())
            .then(data => {
                this.movies = data.results;

            })
            .catch(error => console.log('error', error));
        }
    }
  };
  </script>
  