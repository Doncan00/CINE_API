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
    const principal_cast = ref([])
    








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
                console.log(details.release_dates[0].release_date);
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
                let cast = response.cast;

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

                cast.some(e => {
                    if (e.order > 9){
                        return true
                    }
                    principal_cast.value.push(e)
                    
                })
                console.log(principal_cast.value);
            })

        } catch (error) {
            console.error('hubo un error al obtener los creditos de la pelicula: ' + error);
        }
    })
</script>

<template>

    <div class="movie-details-section">
        <img :src="'https://image.tmdb.org/t/p/w500' + backdrop_path" alt="">
        <img :src="'https://image.tmdb.org/t/p/w500' + poster_path" alt="">
        
        <div class="title">
            <h1>{{ title }}</h1>
            <h1>{{ release_year }}</h1>
        </div>    
        
        <div class="general-information">
            <h1>{{ certification }}</h1>
            <h1>{{ release_date }}</h1> 
            <h1>({{ country }})</h1>
            <h1 v-for="genre in genres">{{ genre }}</h1>
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
                <h1>{{ director.name }}</h1>
                <h2>director</h2>
            </div>
            <div class="screenplayers" v-for="screenplayer in screenplayers">
                <h1>{{ screenplayer.name }}</h1>
                <h2>Screenplay</h2>
            </div>
        </div> 

    </div>

    <div class="information-section">
        <div class="information-left-side">
            
            <div class="principal-cast">
                <h1>Reparto principal</h1>
                <div class="cast">
                    <div class="cast-card" v-for="person in principal_cast">
                        <h1>{{ person.name }}</h1>
                        <h2>{{ person.character }}</h2>
                    </div>
                </div>
                <h2>Reparto y equipo completo</h2>
                <div class="gray-line"></div>
            </div>
            
            <div class="social">
                <div class="social-headers">
                    <h1>Social</h1>
                    <h2>Reseñas</h2>
                    <h2>Debates</h2>
                </div>
                
                <div class="reviews-debates">
                    <div class="review-debate-card">

                    </div>
                </div>
                
                <h1>Ir a debates</h1>
                <div class="gray-line"></div>
            </div>
            
            <div class="midia">
                <div class="midia-headers">
                    <div class="headers">
                        <h1>Media</h1>
                        <h2>Mas popular</h2>
                        <h2>Videos</h2>
                        <h2>Imagenes de fondo</h2>    
                        <h2>Carteles</h2>
                    </div>
                    <div class="links">
                        <a href="">Texto link</a>
                    </div>
                </div>

                <div class="media-content">

                </div>

                <div class="gray-line"></div>
            </div>

            <div class="recomendations">
                <div class="recomendation-card">

                </div>
            </div>
        </div>
         
        <div class="information-right-side">
            <div class="social-media-links">
                <a href=""></a>
                <a href=""></a>
                <a href=""></a>
                <a href=""></a>
            </div>

            <div class="information-resume">
                <h1>Titulo original</h1>
                <h2></h2>

                <h1>Estado</h1>
                <h2></h2>

                <h1>Idioma original</h1>
                <h2></h2>

                <h1>Presupuesto</h1>
                <h2></h2>

                <h1>Ingresos</h1>
                <h2></h2>
            </div>

            <div class="keywords">
                <h1>Palabras clave</h1>
                <div class="keyword-card">
                    <h2></h2>
                </div>
            </div>

            <div class="gray-line"></div>
        
            <div class="content-score">
                <h1>Puntuacion de contenido</h1>

                <div class="score-table">
                    <div class="score"></div>
                    <div class="score-message"></div>
                </div>
            </div> 
            
            <div class="biggest-contributors">
                <h1>Mayores aportadores</h1>

                <div class="contributors">
                    <div class="image-contributor"></div>
                    <div class="contributor">
                        <h1>number</h1>
                        <h2>name</h2>
                    </div>
                </div>

                <a href="">Ver historial de ediciones</a>
            </div>
        
        </div>
    </div>
</template>