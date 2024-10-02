<template>
  <div>
    <div v-if="seasonDetails">
      <h2>{{ seasonDetails.name }}</h2>
      <p>Año de emisión: {{ seasonDetails.air_date }}</p>
      <img :src="'https://image.tmdb.org/t/p/w500' + seasonDetails.poster_path" alt="Poster" />
      <p>Valoración: {{ seasonDetails.vote_average }}</p>
      <h3>Episodios ({{ seasonDetails.episodes.length }})</h3>
      <div v-for="episode in seasonDetails.episodes" :key="episode.id" class="episode-card">
  <div class="episode-content">
    <img :src="'https://image.tmdb.org/t/p/w500' + episode.still_path" alt="Poster" class="episode-image" />
    <div class="episode-info">
      <h4>{{ episode.name }}</h4>
      <p>Fecha de emisión: {{ episode.air_date }}</p>
      <p>{{ episode.overview }}</p>
      <p>Duración: {{ episode.runtime }} minutos</p>
      <p>Valoración: {{ episode.vote_average }}</p>
    </div>
  </div>
</div>

    </div>
    <div v-else>
      <p>Cargando detalles de la temporada...</p>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import SeasonInfoService from '../tvDetails/services/seasonInfoService';

export default {
  data() {
    return {
      seasonDetails: null,
      serieId: null,
      tempId: null,
    };
  },
  created() {
    const route = useRoute();
    this.serieId = route.params.id;
    this.tempId = route.params.seasonId;
    this.fetchSeasonDetails();
  },
  methods: {
    async fetchSeasonDetails() {
      const seasonService = new SeasonInfoService();
      try {
        const response = await seasonService.getSeasonInfo(this.serieId, this.tempId);
        this.seasonDetails = response;
      } catch (error) {
        console.error("Error al obtener detalles de la temporada:", error);
      }
    },
  },
};
</script>

<style scoped>
.episode-card {
  border: 1px solid #ccc;
  margin: 10px 0;
  padding: 10px;
}
</style>
