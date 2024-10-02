<script setup>

    import { ref, onMounted, watch } from "vue"
    import { useRoute, useRouter } from "vue-router";

    const recomendations = ref([]);

    const movie_id = ref(0)

    const route = useRoute()
    const router = useRouter()
    movie_id.value = route.params.id

    const fetchRecomendations = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTZiZDFhOTcyM2EzY2VhMDI2YTllMjUyMDQ2YjMxNiIsIm5iZiI6MTcyNzIyOTY5MC43OTM1OTQsInN1YiI6IjY2ZjJmNWYwYTk3ODgwMTQ4ZjNiOTBiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZfgCHZz_ePmrG_w_m4-p4_wbnkBfoUD1N1DKRDDMh4");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch(`https://api.themoviedb.org/3/movie/${movie_id.value}/recommendations`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
            recomendations.value = response.results;
        })
    }

    onMounted( async () => {
        await fetchRecomendations();
    })

    const goToMovie = (genreId) => {

        window.location.href = `/movie-details/${genreId}`;
    }

</script>

<template>
    <div class="recomendations">
        <button @click="goToMovie(recomendation.id)" class="recomendation-card" v-for="recomendation in recomendations">
                <img :src="'https://image.tmdb.org/t/p/w500' + recomendation.backdrop_path" alt="">
                <h2>{{ recomendation.title }}</h2>
                <h2>{{ recomendation.vote_average }}</h2>
        </button>
    </div>
</template>

<style>
    .recomendations {
        display: flex;
        gap: 20px;
        overflow-x: auto;
        padding: 20px 0;
        scroll-snap-type: x mandatory;
        max-width: calc((200px * 5) + (20px * 3));
        margin: 0 auto;
    }

    .recomendation-card {
        flex: 0 0 200px;
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.2s ease;
        scroll-snap-align: center;
    }

    .recomendation-card img {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }

    .recomendation-card h2 {
        font-size: 1.2em;
        color: #333;
        padding: 10px;
        text-align: center;
    }

    .recomendation-card h2:last-child {
        color: #666;
    }

    .recomendation-card:hover {
        transform: scale(1.05);
    }

    .recomendations::-webkit-scrollbar {
        height: 8px;
    }

    .recomendations::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }

    .recomendations::-webkit-scrollbar-thumb:hover {
        background-color: #999;
    }

</style>