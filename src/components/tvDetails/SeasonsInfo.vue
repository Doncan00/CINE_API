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
            <button @click="toggleCastVisibility(episode.id)">
              {{ episode.showCast ? 'Ocultar Reparto' : 'Mostrar Reparto' }}
            </button>
          </div>
        </div>

        <div v-if="episode.showCast" class="cast-section">
          <h4>Reparto</h4>
          <div class="multimedia-grid">
            <div class="multimedia-card" v-for="actor in episode.guest_stars" :key="actor.id">
              <img v-if="actor.profile_path" :src="'https://image.tmdb.org/t/p/w500' + actor.profile_path" alt="Foto de actor" />
              <h5>{{ actor.name }}</h5>
              <p>Personaje: {{ actor.character }}</p>
            </div>
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
        
        response.episodes.forEach(episode => {
          episode.showCast = false;
          episode.cast = [];
        });
        
        this.seasonDetails = response;
      } catch (error) {
        console.error("Error al obtener detalles de la temporada:", error);
      }
    },
    toggleCastVisibility(episodeId) {
      const episode = this.seasonDetails.episodes.find(ep => ep.id === episodeId);
      if (episode) {
        episode.showCast = !episode.showCast;
        if (episode.showCast && episode.cast.length === 0) {
          this.fetchEpisodeCast(episode);
        }
      }
    },
    async fetchEpisodeCast(episode) {
      try {
        const response = await seasonService.getEpisodeCast(this.serieId, episode.id);
        episode.cast = response.cast || [];
      } catch (error) {
        console.error("Error al obtener el reparto del episodio:", error);
      }
    }
  },
};
</script>
