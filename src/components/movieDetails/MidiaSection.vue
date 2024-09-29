<script setup>

    import { ref, onMounted } from 'vue';

    const videos = ref([])
    const images = ref([])
    const posters = ref([])

    const mostPopularVideo = ref('')
    const mostPopularImage = ref({"vote_average": 0.0})
    const mostPopularPoster = ref({"vote_average": 0.0})

    const midia_showing = ref(0)

    const fetchVideos = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTZiZDFhOTcyM2EzY2VhMDI2YTllMjUyMDQ2YjMxNiIsIm5iZiI6MTcyNzIyOTY5MC43OTM1OTQsInN1YiI6IjY2ZjJmNWYwYTk3ODgwMTQ4ZjNiOTBiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZfgCHZz_ePmrG_w_m4-p4_wbnkBfoUD1N1DKRDDMh4");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch("https://api.themoviedb.org/3/movie/957452/videos", requestOptions)
        .then((response) => response.json())
        .then((response) => {
            for (let i = 0; i < 6; i++) {
                videos.value.push(response.results[i])
            }

            mostPopularVideo.value = response.results[0].name 
        })
    }

    const fetchImages = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTZiZDFhOTcyM2EzY2VhMDI2YTllMjUyMDQ2YjMxNiIsIm5iZiI6MTcyNzIyOTY5MC43OTM1OTQsInN1YiI6IjY2ZjJmNWYwYTk3ODgwMTQ4ZjNiOTBiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZfgCHZz_ePmrG_w_m4-p4_wbnkBfoUD1N1DKRDDMh4");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch("https://api.themoviedb.org/3/movie/957452/images", requestOptions)
        .then((response) => response.json())
        .then((response) => {

            let i = 0
            response.backdrops.forEach(image => {
                if (i < 6){
                    images.value.push(image);
                    i++;
                }

                if (image.vote_average > mostPopularImage.value.vote_average){
                    mostPopularImage.value = image;
                }
            });

            let j = 0;
            response.posters.forEach(poster => {
                if (j < 9){
                    posters.value.push(poster);
                    j++;
                }

                if (poster.vote_average > mostPopularPoster.value.vote_average){
                    mostPopularPoster.value = poster;
                }
            });

        })
    }

    onMounted(() => {
        fetchImages();
        fetchVideos();
    })

</script>

<template>
    <div class="midia">
        <div class="midia-headers">
            <div class="headers">
                <h1>Media</h1>
                <button @click="midia_showing = 0">Mas popular</button>
                <button @click="midia_showing = 1">Videos</button>
                <button @click="midia_showing = 2">Imagenes de fondo</button>    
                <button @click="midia_showing = 3">Carteles</button>
            </div>
            <div class="links">
                <a href="">Texto link</a>
            </div>
        </div>

        <div class="media-content">
            <div class="more-popular" v-if="midia_showing == 0">
                <div>
                    {{ mostPopularVideo }}
                </div>
                <div>
                    <img :src="'https://image.tmdb.org/t/p/w500' + mostPopularImage.file_path" alt="">
                </div>
                <div>
                    <img :src="'https://image.tmdb.org/t/p/w500' + mostPopularPoster.file_path" alt="">
                </div>
            </div>
            <div class="videos" v-if="midia_showing == 1">
                <div v-for="video in videos">
                    videos
                </div>
            </div>
            <div class="bg-imgs" v-if="midia_showing == 2">
                <div v-for="image in images">
                    <img :src="'https://image.tmdb.org/t/p/w500' + image.file_path" alt="">
                </div>
            </div>
            <div class="posters" v-if="midia_showing == 3">
                <div v-for="poster in posters">
                    <img :src="'https://image.tmdb.org/t/p/w500' + poster.file_path" alt="">
                </div>
            </div>
        </div>

    </div>
</template>