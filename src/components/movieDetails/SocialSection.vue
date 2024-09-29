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

    <div class="social-section">
        <div class="social-headers">
            <h1>Social</h1>
            <button @click = "is_Review_Showing = true">Reseñas</button>
            <button @click = "is_Review_Showing = false">Debates</button>
        </div>
        
        <div class="social-content">
            <div class="reviews" v-if="is_Review_Showing">
                <div class="review-card">
                    reviews
                </div>
            </div>
            
            <div class="debates" v-else>
                <div class="debate-card">
                    debates
                </div>
            </div>
        </div>
        
        <a href="">Ir a debates</a>
    </div>

</template>