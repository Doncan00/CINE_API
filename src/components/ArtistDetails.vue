<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";

const artist_id = ref(0)
const route = useRoute()
artist_id.value = route.params.id


const person = ref(null);
const known_For = ref([]);
const allProjects = ref([]);

onMounted(async () => {
    const actorId = 1; // ID del artista
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWJiNjZjYTgxNzA5NjZkMjFmMjI4ZWJmOWI0ZmI4NCIsIm5iZiI6MTcyNzU2NTMzNC4zNDk0NjEsInN1YiI6IjY2ZjMxOGYzMDIyMDhjNjdjODhkYWM4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OKuM2RRKAdnmYI07q5zJ8f8JEg5uOuBuVYuGuOrroOg");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    // ifno actor
    fetch(`https://api.themoviedb.org/3/person/${artist_id.value}?language=es-ES`, requestOptions)
        .then(response => response.json())
        .then(result => {
            person.value = result;
        })
        .catch(error => console.log('error', error));

    // conocido por info
    fetch(`https://api.themoviedb.org/3/person/${artist_id.value}/combined_credits?language=es-ES`, requestOptions)
        .then(response => response.json())
        .then(result => {
            const knowMovies = result.cast;
            allProjects.value = knowMovies;
            known_For.value = knowMovies.slice(0, 5);
            console.log(knowMovies);
        })
        .catch(error => console.log('error', error));
});
</script>

<template>
    <div class="container" v-if="person">
        <aside class="personal-info">
            <img :src="'https://image.tmdb.org/t/p/w300' + person.profile_path" alt="Foto de perfil" class="profile-picture" />
            <h2>Información personal</h2>
            <ul>
                <li><strong>Conocido por:</strong> {{ person.known_for_department }}</li>
                <li><strong>Créditos conocidos:</strong> {{ person.known_for_department.length }}</li>
                <li><strong>Sexo:</strong> {{ person.gender === 2 ? 'Masculino' : 'Femenino' }}</li>
                <li><strong>Fecha de nacimiento:</strong> {{ person.birthday }} ({{ person.age }} años)</li>
                <li><strong>Lugar de nacimiento:</strong> {{ person.place_of_birth }}</li>
                <li><strong>También conocido como:</strong></li>
                <ul>
                    <li v-for="alias in person.also_known_as" :key="alias">{{ alias }}</li>
                </ul>
            </ul>
        </aside>

        <main class="main-content">
            <h1>{{ person.name }}</h1>
            <section class="biography">
                <h2>Biografía</h2>
                <p>{{ person.biography }}</p>
            </section>
            
            <section class="known-for">
                <h2>Conocido por</h2>
                <div class="movie-list">
                    <div v-for="movie in known_For" :key="movie.id" class="movie-card">
                        <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" :alt="movie.title" />
                        <p>{{ movie.title }}</p>
                    </div>
                </div>
            </section>

            <section class="filmography">
            <h2>Filmografía</h2>
            <ul v-if="allProjects.length">
                <li v-for="knowMovies in allProjects" :key="knowMovies.id">
                    <p>({{ knowMovies.release_date || knowMovies.first_air_date }}) - {{ knowMovies.title || knowMovies.name }} - {{ knowMovies.media_type}} </p>
                </li>
            </ul>
            </section>

        </main>
    </div>
</template>

<style scoped>
/*Contenedor*/
.container {
    display: grid;
    grid-template-columns: 1.5fr 3fr;
    gap: 20px;
    align-items: start;
}

/*Informacion personal del actoers*/
.personal-info {
    background-color: #f9f9f9;
    color: black;
    padding: 50px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-left: 20%;
}

.profile-picture {
    width: 100%;
    border-radius: 5px;
}

.personal-info ul {
    list-style: none;
    padding: 0;
}

.personal-info ul li {
    margin-bottom: 10px;
}

/* Contenido principal */
.main-content {
    padding: 20px;
}

.biography {
    margin-top: 20px;
    width: 100%;
}

.biography p {
    line-height: 2.0;
}

/*Conocido porrr */
.known-for {
    margin: 20px 0;
} 

.movie-list {
    display: flex;
    overflow-x: scroll;
}

.movie-card {
    width: 100px;
    margin-right: 10px;
    margin-left: 100px;
}

.filmography {
    margin-top: 40px;
}

.filmography ul {
    padding-left: 20px;
    font-weight: bold;
}

.filmography li {
    font-size: 1rem;
    color: #ffffff;
    line-height: 1.6;
    margin-bottom: 8px;
}
</style>
