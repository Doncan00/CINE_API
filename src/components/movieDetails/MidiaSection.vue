<script setup>

    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const videos = ref([])
    const images = ref([])
    const posters = ref([])

    const mostPopularVideo = ref('')
    const mostPopularImage = ref({"vote_average": 0.0})
    const mostPopularPoster = ref({"vote_average": 0.0})

    const midia_showing = ref(0)

    const movie_id = ref(0)

    const route = useRoute()
    movie_id.value = route.params.id

    const fetchVideos = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTZiZDFhOTcyM2EzY2VhMDI2YTllMjUyMDQ2YjMxNiIsIm5iZiI6MTcyNzIyOTY5MC43OTM1OTQsInN1YiI6IjY2ZjJmNWYwYTk3ODgwMTQ4ZjNiOTBiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZfgCHZz_ePmrG_w_m4-p4_wbnkBfoUD1N1DKRDDMh4");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch(`https://api.themoviedb.org/3/movie/${movie_id.value}/videos`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
            for (let i = 0; i < 6; i++) {
                videos.value.push(response.results[i])
            }

            mostPopularVideo.value = response.results[0].key
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

        fetch(`https://api.themoviedb.org/3/movie/${movie_id.value}/images`, requestOptions)
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
                <button @click="midia_showing = 0" :class="{ active: midia_showing === 0 }">Mas popular</button>
                <button @click="midia_showing = 1" :class="{ active: midia_showing === 1 }">Videos</button>
                <button @click="midia_showing = 2" :class="{ active: midia_showing === 2 }">Imagenes de fondo</button>
                <button @click="midia_showing = 3" :class="{ active: midia_showing === 3 }">Carteles</button>
            </div>
            <div class="links" v-if="midia_showing == 1">
                <a href="">See all videos</a>
            </div>
            <div class="links" v-if="midia_showing == 2">
                <a href="">See all background images</a>
            </div>
            <div class="links" v-if="midia_showing == 3">
                <a href="">See all posters</a>
            </div>
        </div>

        <div class="media-content">
            <div class="more-popular" v-if="midia_showing == 0">
                <div>
                    <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${mostPopularVideo}`" frameborder="0" allowfullscreen></iframe>
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
                    <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${video.key}`" frameborder="0" allowfullscreen></iframe>
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

<style>
    .midia {
        background-color: white;
        padding: 20px;
        max-width: 1200px;
        margin: 0;
    }

    .midia-headers {
        display: flex;
        justify-content: space-between; 
        align-items: center;
        padding-bottom: 10px;
        margin-bottom: 5px;
    }

    .midia-headers h1 {
        display: inline;
        font-size: 1.5em;
        color: #333;
    }

    .headers button {
        background-color: white;
        border: none;
        font-size: 1.2em;
        color: #333;
        margin: 0 10px;
        padding: 10px 15px;
        cursor: pointer;
        transition: border-bottom 0.3s ease;
    }

    .headers button:hover {
        border-bottom: 2px solid black;
    }

    .headers button.active {
        font-weight: bold;
        border-bottom: 2px solid black;
    }

    .links a {
        color: #007bff;
        text-decoration: none;
        font-size: 1em;
        margin-top: 0px;
    }

    .media-content {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .more-popular {
        display: flex;
        align-items: center;
        width: 100%;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
    }

    .more-popular div {
        display: flex;
        justify-content: center;
        
    }
    
    .more-popular img {
        height: 300px;
    }

    .videos, .bg-imgs, .posters {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;

    }

    .videos div, .bg-imgs div, .posters div {
        flex: 1;
        text-align: center;

    }

    .videos img, .bg-imgs img, .posters img {
        height: 300px;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.2s ease;
        scroll-snap-align: center;

    }

    .posters::-webkit-scrollbar {
        height: 8px;
    }

    .posters::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }

    .posters::-webkit-scrollbar-thumb:hover {
        background-color: #999;
    }

    .bg-imgs::-webkit-scrollbar {
        height: 8px;
    }

    .bg-imgs::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }

    .bg-imgs::-webkit-scrollbar-thumb:hover {
        background-color: #999;
    }

    .videos::-webkit-scrollbar {
        height: 8px;
    }

    .videos::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }

    .videos::-webkit-scrollbar-thumb:hover {
        background-color: #999;
    }

    .more-popular::-webkit-scrollbar {
        height: 8px;
    }

    .more-popular::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }

    .more-popular::-webkit-scrollbar-thumb:hover {
        background-color: #999;
    }

</style>