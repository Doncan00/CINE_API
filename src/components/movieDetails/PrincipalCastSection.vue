<script setup>
    import { ref, onMounted } from 'vue';

    const principal_cast = ref([])

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

            fetch("https://api.themoviedb.org/3/movie/957452/credits", requestOptions)
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

    <div class="principal-cas">
        <h1>Reparto principal</h1>
        <div class="cast">
            <div class="cast-card" v-for="person in principal_cast">
                <h1>{{ person.name }}</h1>
                <h2>{{ person.character }}</h2>
            </div>
        </div>
        <a href="">Reparto y equipo completo</a>
    </div>

</template>