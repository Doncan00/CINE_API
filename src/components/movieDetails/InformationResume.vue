<script setup>
    
    import { ref, onMounted } from 'vue';

    const original_title = ref('')
    const status = ref('')
    const original_lenguage = ref ('')
    const budget = ref(0)
    const revenue = ref(0)
    const keywords = ref([])
    const facebook_id = ref('')
    const twitter_id = ref('')
    const instagram_id = ref('')
    const homepage = ref('')

    const fetchInformation = async () => {
        const requestOptions = {
        method: "GET",
        redirect: "follow"
        };

        fetch("https://api.themoviedb.org/3/movie/957452?api_key=9a6bd1a9723a3cea026a9e252046b316", requestOptions)
        .then((response) => response.json())
        .then((response) => {
            original_title.value = response.original_title;
            status.value = response.status;
            original_lenguage.value = response.original_lenguage;
            budget.value = response.budget;
            revenue.value = response.revenue
            homepage.value = response.homepage;
        })
    }

    const fetchKeyword = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTZiZDFhOTcyM2EzY2VhMDI2YTllMjUyMDQ2YjMxNiIsIm5iZiI6MTcyNzIyOTY5MC43OTM1OTQsInN1YiI6IjY2ZjJmNWYwYTk3ODgwMTQ4ZjNiOTBiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZfgCHZz_ePmrG_w_m4-p4_wbnkBfoUD1N1DKRDDMh4");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch("https://api.themoviedb.org/3/movie/957452/keywords", requestOptions)
        .then((response) => response.json())
        .then((response) => {
            keywords.value = response.keywords;
        })
    }

    const fetchExternalIds = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTZiZDFhOTcyM2EzY2VhMDI2YTllMjUyMDQ2YjMxNiIsIm5iZiI6MTcyNzIyOTY5MC43OTM1OTQsInN1YiI6IjY2ZjJmNWYwYTk3ODgwMTQ4ZjNiOTBiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fZfgCHZz_ePmrG_w_m4-p4_wbnkBfoUD1N1DKRDDMh4");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        fetch("https://api.themoviedb.org/3/movie/957452/external_ids", requestOptions)
        .then((response) => response.json())
        .then((response) => {
            facebook_id.value = response.facebook_id;
            twitter_id.value = response.twitter_id;
            instagram_id.value = response.instagram_id;
        })
    }

    onMounted(() => {
        fetchInformation();
        fetchKeyword();
        fetchExternalIds();
    })

</script>

<template>

    <div class="information-resume">
        
        <div class="social-media-links">
            <a :href="'https://www.facebook.com/' + facebook_id">facebook</a>
            <a :href="'https://x.com/' + twitter_id">twitter</a>
            <a :href="'https://www.instagram.com/' + instagram_id">instagram</a>
            <div class="vertica-gray-line"></div>
            <a :href="homepage">homepage</a>
        </div>
    
        <div class="information-resume">
            <h1>Titulo original</h1>
            <h2>{{ original_title }}</h2>
    
            <h1>Estado</h1>
            <h2>{{ status }}</h2>
    
            <h1>Idioma original</h1>
            <h2>{{ original_lenguage }}</h2>
    
            <h1>Presupuesto</h1>
            <h2>{{ budget }}</h2>
    
            <h1>Ingresos</h1>
            <h2>{{ revenue }}</h2>
        </div>
    
        <div class="keywords">
            <h1>Palabras clave</h1>
            <div class="keyword-card">
                <h2 v-for="keyword in keywords">{{ keyword.name }}</h2>
            </div>
        </div>

    </div>


</template>