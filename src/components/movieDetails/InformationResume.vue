<script setup>
    
    import { ref, onMounted } from 'vue';

    const original_title = ref('')
    const status = ref('')
    const original_language = ref ('')
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
            original_language.value = response.original_language;
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

    <div class="information">
        
        <div class="social-media-links">
            <a :href="'https://www.facebook.com/' + facebook_id">f</a>
            <a :href="'https://x.com/' + twitter_id">t</a>
            <a :href="'https://www.instagram.com/' + instagram_id">i</a>
            <div class="vertical-gray-line"></div>
            <a :href="homepage">h</a>
        </div>
    
        <div class="information-resume">
            <h1>Titulo original</h1>
            <h2>{{ original_title }}</h2>
    
            <h1>Estado</h1>
            <h2>{{ status }}</h2>
    
            <h1>Idioma original</h1>
            <h2>{{ original_language }}</h2>
    
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

<style>
    .information {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        padding-top: 40px;
    }
    
    .information-resume {
        display: flex;
        flex-direction: column;

    }

    .social-media-links {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
    }

    .social-media-links a {
        font-size: 18px;
        color: #333;
        text-decoration: none;
        transition: color 0.2s ease;
        margin: 0;
    }

    .social-media-links a:hover {
        color: #555;
        height: 100%;
    }

    .vertical-gray-line {
        height: 25px;
        width: 2px;
        background-color: #ccc;
    }

    .information-resume h1 {
        font-size: 18px;
        font-weight: bold;
        margin: 0;
        margin-bottom: 5px;
        color: #333;
    }

    .information-resume h2 {
        font-size: 16px;
        margin: 0;
        margin-bottom: 15px;
        color: #666;
    }

    .keywords {
        margin-top: 20px;
    }

    .keywords h1 {
        font-size: 18px;
        margin-bottom: 10px;
    }

    .keyword-card {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .keyword-card h2 {
        background-color: #f0f0f0;
        color: #333;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 14px;
        margin: 0;
    }

</style>