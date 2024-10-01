<script setup>

    import { ref, onMounted, computed } from "vue";
    import MovieCard from "./components/KeywordResults/MovieCard.vue";

    const movies = ref([])
    const total_results = ref(0)
    const keyword_name = ref('')

    const is_showing_more = ref(false)

    const fetchKeywordMovies = async () => {

        let page = 1;
        let totalPages = 1;
        
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTZiZDFhOTcyM2EzY2VhMDI2YTllMjUyMDQ2YjMxNiIsIm5iZiI6MTcyNzIyOTY5MC43OTM1OTQsInN1YiI6IjY2ZjJmNWYwYTk3ODgwMTQ4ZjNiOTBiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZfgCHZz_ePmrG_w_m4-p4_wbnkBfoUD1N1DKRDDMh4");
        
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        
        while (page <= totalPages) {
    
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_keywords=815&page=${page}`, requestOptions);
            const data = await response.json();

            movies.value = [...movies.value, ...data.results];
            total_results.value = data.total_results;
            totalPages = data.total_pages;

            page++;
        }
        
    }

    const fetchKeywordData = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTZiZDFhOTcyM2EzY2VhMDI2YTllMjUyMDQ2YjMxNiIsIm5iZiI6MTcyNzIyOTY5MC43OTM1OTQsInN1YiI6IjY2ZjJmNWYwYTk3ODgwMTQ4ZjNiOTBiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZfgCHZz_ePmrG_w_m4-p4_wbnkBfoUD1N1DKRDDMh4");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch("https://api.themoviedb.org/3/keyword/815", requestOptions)
        .then((response) => response.json())
        .then((response) => {
            keyword_name.value = response.name;
        })
    }

    const moviesToShow = computed(() => {
        return is_showing_more.value
            ? movies.value
            : movies.value.slice(0, Math.ceil(movies.value.length / 2))
    })

    onMounted(() => {
        fetchKeywordMovies();
        fetchKeywordData();
    })


</script>

<template>

    <div class="header-section">
        <h1>{{ keyword_name }}</h1>
        <h1>{{ total_results }}</h1>
    </div>

    <div class="content-section">
        <div v-for="movie in moviesToShow">
            <MovieCard 
                :backdrop_path="movie.backdrop_path"
                :title="movie.title"
                :release_date="movie.release_date"
                :overview="movie.overview"
            />
        </div>

        <div v-if="!is_showing_more">
            <button type="button" @click="is_showing_more = true">Show More</button>
        </div>
    </div>    

</template>

<style scoped>
/* Estilos generales */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

h1 {
  font-size: 24px;
  font-family: 'Arial', sans-serif; 
  font-weight: bold;
  margin: 0;
  padding: 0;
}

/* Estilo para la sección del encabezado */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0c2a45;
  color: white;
  padding: 20px;
}

.header-section h1 {
  margin: 0;
  font-size: 28px;
}

/* Estilos para la sección del contenido */
.content-section {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Estilo para el botón de "Show More" */
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  display: block;
  margin: 0 auto;
}

button:hover {
  background-color: #0056b3;
}


</style>