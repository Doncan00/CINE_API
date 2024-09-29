<script setup>

    import { ref, onMounted } from "vue";

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

    onMounted( async () => {
        //movie
        try {
            const requestOptions = {
            method: "GET",
            redirect: "follow"
            };
    
            fetch("https://api.themoviedb.org/3/movie/957452?api_key=9a6bd1a9723a3cea026a9e252046b316", requestOptions)
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

            fetch("https://api.themoviedb.org/3/movie/957452/release_dates", requestOptions)
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

            fetch("https://api.themoviedb.org/3/movie/957452/credits", requestOptions)
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

</script>

<template>
    <div class="details-section">
        <img :src="'https://image.tmdb.org/t/p/w500' + backdrop_path" alt="">
        <img :src="'https://image.tmdb.org/t/p/w500' + poster_path" alt="">
        
        <div class="title">
            <a href>{{ title }}</a>
            <h1>{{ release_year }}</h1>
        </div>    
        
        <div class="general-information">
            <h1>{{ certification }}</h1>
            <h1>{{ release_date }}</h1> 
            <h1>({{ country }})</h1>
            <a href="" v-for="genre in genres">{{ genre }}</a>
            <h1>{{ runtime }}</h1>
        </div>
        
        <div class="vote-average">
            <h1>{{ vote_average }}</h1>
            <h2>Puntuacion de usuarios</h2>
        </div>
        
        <div class="tagline-overview">
            <h1>{{ tagline }}</h1>
            <h1>Vista general</h1>
            <h1>{{ overview }}</h1>
        </div>
        
        <div class="director-screenplay">
            <div class="directors" v-for="director in directors">
                <a href="">{{ director.name }}</a>
                <h2>director</h2>
            </div>
            <div class="screenplayers" v-for="screenplayer in screenplayers">
                <a href="">{{ screenplayer.name }}</a>
                <h2>Screenplay</h2>
            </div>
        </div> 
    </div>
</template>