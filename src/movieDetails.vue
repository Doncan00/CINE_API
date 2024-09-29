<script setup>
    import { ref, onMounted } from "vue";
    import DetailsSection from "./components/movieDetails/DetailsSection.vue";
    import PrincipalCastSection from "./components/movieDetails/PrincipalCastSection.vue";
    import SocialSection from "./components/movieDetails/SocialSection.vue";
    import MidiaSection from "./components/movieDetails/MidiaSection.vue";
    import InformationResume from "./components/movieDetails/InformationResume.vue";
    import ScoreContributors from "./components/movieDetails/ScoreContributors.vue";
</script>

<template>

    <div class="movie-details-section">
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

            <div class="recomendations">
                <div class="recomendation-card">

                </div>
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
</template>