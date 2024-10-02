<script setup>

    import { ref, onMounted } from 'vue';

    const review_author = ref('')
    const review_avatar_path = ref('') 
    const review_rating = ref(0.0)
    const review_created_at = ref('')
    const review_content = ref('')

    const is_Review_Showing = ref(true)

    onMounted( async () => {

        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTZiZDFhOTcyM2EzY2VhMDI2YTllMjUyMDQ2YjMxNiIsIm5iZiI6MTcyNzIyOTY5MC43OTM1OTQsInN1YiI6IjY2ZjJmNWYwYTk3ODgwMTQ4ZjNiOTBiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZfgCHZz_ePmrG_w_m4-p4_wbnkBfoUD1N1DKRDDMh4");

            const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
            };

            fetch("https://api.themoviedb.org/3/movie/957452/reviews", requestOptions)
            .then((response) => response.json())
            .then((response) => {
                let results = response.results;
                
                let result = results[Math.floor(Math.random() * results.length)]                
                
                review_avatar_path.value = result.author_details.avatar_path;
                review_author.value = result.author;
                review_rating.value = result.author_details.rating;
                
                let date = new Date(result.created_at)
                review_created_at.value = date.toISOString().split('T')[0];
                
                review_content.value = result.content;

            })

        } catch (error) {
           console.error('hubo un error al obtener las resenas de la pelicula: ' + error) 
        }

    })


</script>

<template>

    <div class="social">
        <div class="social-headers">
            <h1>Social</h1>
            <button @click = "is_Review_Showing = true">Reseñas</button>
            <button @click = "is_Review_Showing = false">Debates</button>
        </div>
        
        
        <div class="social-content">
            <div class="reviews" v-if="is_Review_Showing">
                <div class="review-card">
                    <img :src="'https://image.tmdb.org/t/p/w500' + review_avatar_path" alt="">
                    <h1>A review made for {{ review_author }}</h1>
                    <h2>★ {{ review_rating }} %</h2>
                    <h2>Write by {{ review_author }} in {{ review_created_at }}</h2>
                    <p>{{ review_content }}</p>
                </div>
            </div>
            
            <div class="debates" v-else>
                <div class="debate-card">
                    debates
                </div>
            </div>
        </div>

        <a v-if="is_Review_Showing" href="">Read all reviews</a>
        <a v-else href="">go to dabates</a>
    </div>

</template>

<style>
    .social {
        display: flex;
        background-color: white;
        padding: 20px;
        max-width: 87%;
        min-width: 87%;
        margin: 0 ;
        flex-direction: column;
        align-items: flex-start;
    }

    .social-headers {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 20px;
    }

    .social-headers h1 {
        font-size: 1.5em;
        color: #333;
    }

    .social-headers button {
        background-color: white;
        border: none;
        font-size: 1.2em;
        color: #333;
        padding: 10px 15px;
        cursor: pointer;
        transition: border-bottom 0.3s ease;
    }

    .social-headers button:hover {
        border-bottom: 2px solid black;
    }

    .social-headers button.active {
        font-weight: bold;
        border-bottom: 2px solid black;
    }

    .social-content {
        margin-bottom: 20px;
    }

    .review-card, .debate-card {
   
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
    }

    .review-card h2, .debate-card h2 {
        font-size: 1.2em;
        color: #333;
        margin-bottom: 10px;
    }

    .review-card p, .debate-card p {
        font-size: 1em;
        color: #555;
    }

    a {
        display: block;
        text-decoration: none;
        color: #000;
        text-align: center;
        margin-top: 20px;
        font-weight: 600;
        font-size: 1.1em;
    }

</style>