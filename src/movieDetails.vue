<script setup>
    import { ref, onMounted } from "vue";
    import DetailsSection from "./components/MovieDetails/DetailsSection.vue";
    import PrincipalCastSection from "./components/MovieDetails/PrincipalCastSection.vue";
    import SocialSection from "./components/MovieDetails/SocialSection.vue";
    import MidiaSection from "./components/MovieDetails/MidiaSection.vue";
    import InformationResume from "./components/MovieDetails/InformationResume.vue";
    import ScoreContributors from "./components/MovieDetails/ScoreContributors.vue";
    import RecomendationSection from "./components/MovieDetails/RecomendationSection.vue"
</script>

<template>

    <div class="movie-details">

        <div class="movie-details-top-section">
            <DetailsSection />
        </div>
    
        <div class="information-section">
            <div class="information-left-side">
                
                <div class="principal-cast-section">
                    <PrincipalCastSection />
                </div>
    
                <div class="gray-line"></div>
                
                <div class="social-section">
                    <SocialSection />
                </div>
    
                <div class="gray-line"></div>
                
                <div class="midia-section">
                    <MidiaSection />
                </div>
    
                <div class="gray-line"></div>
    
                <div class="recomendations-section">
                    <recomendationSection />
                </div>
            </div>
             
            <div class="information-right-side">
    
                <div class="information-resume-section">
                    <InformationResume />
                </div>
    
                <div class="gray-line"></div>
            
                <div class="score-contributors-section">
                    <ScoreContributors />
                </div>
            
            </div>
    
        </div>

    </div>

</template>

<style>
    .movie-details {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .social-section {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .information-section {
        display: flex;
        margin: 0 10%;
    }

    .information-left-side {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 80%;
    }

    .information-right-side {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        width: 20%;
    }

    .gray-line{
        background-color: gray;
        width: 95%;
        height: 1px;
        margin: 20px auto;

    }
</style>