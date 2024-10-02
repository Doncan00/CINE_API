<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const principal_cast = ref([])

    const movie_id = ref(0)

    const route = useRoute()
    movie_id.value = route.params.id

    onMounted( async () => {
        
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

                let cast = response.cast;

                cast.some(e => {
                    if (e.order > 9){
                        return true
                    }
                    principal_cast.value.push(e)
                    
                })
            })

        } catch (error) {
            console.error('hubo un error al obtener los creditos de la pelicula: ' + error);
        }

    })


</script>

<template>

    <div class="principal-cast">
        <h1>Reparto principal</h1>
        <div class="cast">
            <div class="cast-card" v-for="person in principal_cast">
                <img :src="'https://image.tmdb.org/t/p/w500' + person.profile_path" alt="">
                <h1>{{ person.name }}</h1>
                <h2>{{ person.character }}</h2>
            </div>
        </div>
        <a href="">Reparto y equipo completo</a>
    </div>

</template>

<style>
    .principal-cast {
        background-color: white;
        padding: 20px;
        padding-top: 40px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .principal-cast h1 {
        font-size: 1.8em;
        color: #333;
        margin-top: 0;
        margin-bottom: 20px;
    }

    .cast {
        display: flex;
        gap: 20px;
        overflow-x: auto;
        padding-bottom: 10px;
        scroll-snap-type: x mandatory;
        
    }

    .cast-card {
        flex: 0 0 auto; /* Fija el tamaño de la tarjeta */
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f9f9f9;
        border-radius: 10px;
        width: 150px; /* Tamaño fijo para cada tarjeta */
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        padding: 10px;
        scroll-snap-align: center; /* Hace que cada tarjeta se alinee al centro del carrusel */
    }

    .cast-card img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin-bottom: 10px;
    }

    .cast-card h1 {
        font-size: 1em;
        color: #333;
        margin: 5px 0;
        text-align: center;
    }

    .cast-card h2 {
        font-size: 0.9em;
        color: #666;
        text-align: center;
    }

    a {
        display: block;
        margin-top: 20px;
        font-size: 1em;
        text-decoration: none;
        color: #007bff;
        text-align: center;
    }

    .cast::-webkit-scrollbar {
        height: 8px;
    }

    .cast::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }

    .cast::-webkit-scrollbar-thumb:hover {
        background-color: #999;
    }


</style>