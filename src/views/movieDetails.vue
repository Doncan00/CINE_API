<script setup>
    import { ref } from "vue";
    import { useRoute } from "vue-router";
    import DetailsSection from "@/components/movieDetails/DetailsSection.vue";
    import PrincipalCastSection from "@/components/movieDetails/PrincipalCastSection.vue";
    import SocialSection from "@/components/movieDetails/SocialSection.vue";
    import MidiaSection from "@/components/movieDetails/MidiaSection.vue";
    import RecomendationSection from "@/components/movieDetails/RecomendationSection.vue";
    import InformationResume from "@/components/movieDetails/InformationResume.vue";

    const movie_id = ref(0)

    const route = useRoute()
    movie_id.value = route.params.id

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

                <div class="recomendation-section">
                    <RecomendationSection />
                </div>
            </div>
             
            <div class="information-right-side">
    
                <div class="information-resume-section">
                    <InformationResume />
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