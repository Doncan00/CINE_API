<script setup>

    import { ref, onMounted } from "vue";
    import { useRoute, useRouter } from "vue-router";

    const title = ref('')
    const poster_path = ref('')
    const backdrop_path = ref('')
    const certification = ref('')
    const release_year = ref('') 
    const release_date = ref('')
    const country = ref('')
    const genres = ref([])
    const runtime = ref(0)
    const vote_average = ref(0.0)
    const tagline = ref('')
    const overview = ref('')
    const directors = ref([])
    const screenplayers = ref([])

    const movie_id = ref(0)

    const route = useRoute()
    const router = useRouter()
    movie_id.value = route.params.id

    onMounted( async () => {
        
        //movie
        try {
            const requestOptions = {
            method: "GET",
            redirect: "follow"
            };
    
            fetch(`https://api.themoviedb.org/3/movie/${movie_id.value}?api_key=9a6bd1a9723a3cea026a9e252046b316`, requestOptions)
            .then((response) => response.json())
            .then((response) => {
                title.value = response.title;
                poster_path.value = response.poster_path;
                backdrop_path.value = response.backdrop_path;

                response.genres.forEach(e => {
                    genres.value.push(e.name);
                });

                runtime.value = response.runtime;
                vote_average.value = response.vote_average;
                tagline.value = response.tagline; overview.value = response.overview;
            })

        } catch (error) {
            console.error('hubo un error al obtener los detalles de la pelicula: ' + error);
        }

        //release dates
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTZiZDFhOTcyM2EzY2VhMDI2YTllMjUyMDQ2YjMxNiIsIm5iZiI6MTcyNzIyOTY5MC43OTM1OTQsInN1YiI6IjY2ZjJmNWYwYTk3ODgwMTQ4ZjNiOTBiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZfgCHZz_ePmrG_w_m4-p4_wbnkBfoUD1N1DKRDDMh4");

            const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
            };

            fetch(`https://api.themoviedb.org/3/movie/${movie_id.value}/release_dates`, requestOptions)
            .then((response) => response.json())
            .then((response) => {

                let results = response.results;
                let details = {};
                
                results.some(e => {
                    if (e.iso_3166_1 == 'MX'){
                        details = e;
                        return true;
                    }
                    
                    if (e.iso_3166_1 == 'US'){
                        details = e;
                        return true
                    }
                    return false;
                });

                certification.value = details.release_dates[0].certification;
                
                let date = new Date(details.release_dates[0].release_date)
                release_year.value = date.getUTCFullYear();
                release_date.value = date.toISOString().split('T')[0];
                
                country.value = details.iso_3166_1;

            })

        } catch (error) {
            console.error('hubo un error al obtener las fechas de salida de la pelicula: ' + error);
        }

        //credits
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTZiZDFhOTcyM2EzY2VhMDI2YTllMjUyMDQ2YjMxNiIsIm5iZiI6MTcyNzIyOTY5MC43OTM1OTQsInN1YiI6IjY2ZjJmNWYwYTk3ODgwMTQ4ZjNiOTBiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZfgCHZz_ePmrG_w_m4-p4_wbnkBfoUD1N1DKRDDMh4");

            const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
            };

            fetch(`https://api.themoviedb.org/3/movie/${movie_id.value}/credits`, requestOptions)
            .then((response) => response.json())
            .then((response) => {
                let crew = response.crew;

                crew.forEach(e => {
                    if (e.job == 'Director'){
                        directors.value.push(e);
                    }
                })

                crew.forEach(e => {
                    if (e.job == 'Screenplay'){
                        screenplayers.value.push(e)
                    }
                })

            })

        } catch (error) {
            console.error('hubo un error al obtener los creditos de la pelicula: ' + error);
        }
    })    

    const goToCredit = (creditId) => {
        
        router.push({ path: `/artist-details/${creditId}`})
    }

    const goToGenre = (genreId) => {

        router.push({ path: `/genre/${genreId}`})
    }



</script>

<template>
    <div class="details-section" :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/w500' + backdrop_path + ')' }">
        <div class="details-section-top">
            <img :src="'https://image.tmdb.org/t/p/w500' + poster_path" alt="">

        </div>
        
        <div class="details-section-bottom">

            <div class="title">
                <a href>{{ title }}</a>
                <h1>{{ release_year }}</h1>
            </div>    
            
            <div class="general-information">
                <h1>{{ certification }}</h1>
                <h1>{{ release_date }}</h1> 
                <h1>({{ country }})</h1>
                <button v-for="genre in genres" @click="goToGenre(genre.id)">{{ genre }}</button>
                <h1>{{ runtime }}</h1>
            </div>
            
            <div class="vote-average">
                <h1>{{ vote_average }}</h1>
                <h2>Puntuacion de usuarios</h2>
            </div>
            
            <div class="tagline-overview">
                <h1>{{ tagline }}</h1>
                <h1>Overview</h1>
                <h1>{{ overview }}</h1>
            </div>
            
            <div class="director-screenplay">
                <div class="directors" v-for="director in directors">
                    <button @click="goToCredit(director.id)">{{ director.name }}</button>
                    <h2>director</h2>
                </div>
                <div class="screenplayers" v-for="screenplayer in screenplayers">
                    <button @click="goToCredit(screenplayer.id)">{{ screenplayer.name }}</button>
                    <h2>Screenplay</h2>
                </div>
            </div> 
        </div>
    </div>
</template>

<style>
    .details-section {
        background-image: url();
        display: flex;
        flex-direction: row;
        background-color: #1a1a1a;
        color: white;
        font-family: Arial, sans-serif;
        padding: 20px;
        width: 97.35%;
        margin: 0;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        align-items: center;
        justify-content: center;
    }

    .details-section img {
        max-width: 30%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .title a {
        font-size: 2em;
        color: #fff;
        text-decoration: none;
    }

    .title h1 {
        font-size: 1.5em;
        color: #888;
    }

    .general-information {
        display: flex;
        gap: 15px;
        font-size: 1.2em;
        margin: 10px 0;
    }

    .general-information h1, .general-information a {
        color: #ccc;
    }

    .general-information a {
        text-decoration: none;
        color: #50b8f2;
    }

    .vote-average {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .vote-average h1 {
        font-size: 2em;
        color: #82d742;
        margin-right: 10px;
    }

    .vote-average h2 {
        font-size: 1em;
        color: #ccc;
    }

    .tagline-overview {
        margin-top: 20px;
    }

    .tagline-overview h1:first-child {
        font-style: italic;
        font-size: 1.5em;
        color: #ccc;
        margin-bottom: 10px;
    }

    .tagline-overview h1 {
        margin: 10px 0;
        font-size: 1.2em;
        color: #ddd;
    }

    .director-screenplay {
        display: flex;
        gap: 50px;
        margin-top: 30px;
    }

    .director-screenplay div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .director-screenplay a {
        color: #50b8f2;
        font-size: 1.2em;
        text-decoration: none;
    }

    .director-screenplay h2 {
        font-size: 1em;
        color: #888;
        margin-top: 5px;
    }

</style>