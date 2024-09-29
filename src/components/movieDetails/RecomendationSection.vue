<script setup>

    import { ref, onMounted } from "vue"

    const recomendations = ref([]);

    const fetchRecomendations = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTZiZDFhOTcyM2EzY2VhMDI2YTllMjUyMDQ2YjMxNiIsIm5iZiI6MTcyNzIyOTY5MC43OTM1OTQsInN1YiI6IjY2ZjJmNWYwYTk3ODgwMTQ4ZjNiOTBiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZfgCHZz_ePmrG_w_m4-p4_wbnkBfoUD1N1DKRDDMh4");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch("https://api.themoviedb.org/3/movie/957452/recommendations", requestOptions)
        .then((response) => response.json())
        .then((response) => {
            recomendations.value = response.results;
        })
    }

    onMounted(() => {
        fetchRecomendations();
    })


</script>

 <template>
    <div class="recomendations">
        <div class="recomendation-card" v-for="recomendation in recomendations">
            <img :src="'https://image.tmdb.org/t/p/w500' + recomendation.backdrop_path" alt="">
            <h2>{{ recomendation.title }}</h2>
            <h2>{{ recomendation.vote_average }}</h2>
        </div>
    </div>
 </template>