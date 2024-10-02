<script setup>

    import { ref, onMounted, computed } from "vue";
    import { useRoute } from "vue-router";

    import MovieCard from "./components/KeywordResults/MovieCard.vue";

    const movies = ref([])
    const total_results = ref(0)
    const keyword_name = ref('')
    const keyword_id = ref(0)

    const is_showing_more = ref(false)

    const route = useRoute()
    keyword_id.value = route.params.id

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
    
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_keywords=${keyword_id.value}&page=${page}`, requestOptions);
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

        fetch(`https://api.themoviedb.org/3/keyword/${keyword_id.value}`, requestOptions)
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

    onMounted( async () => {
        console.log(keyword_id.value);

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