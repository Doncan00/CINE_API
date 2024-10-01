<template>
  <div>
    <!-- login -->
    <form @submit.prevent="onSubmit" v-if="!acceso">
      <input v-model="username" placeholder="username" type="text" />
      <input v-model="password" placeholder="password" type="password" />
      <button type="submit">Ingresar</button>
    </form>
    <div v-else>
      <!-- serie info -->
      <div v-if="selectSeriesFlag" class="selectedMultimedia">
        <img :src="`https://image.tmdb.org/t/p/w500${serieInfo.backdrop_path}`" class="multimedia-image"
          alt="Series Poster" />

        <h1>{{ serieInfo.original_name }}</h1>
        <p>Calificación promedio: {{ serieInfo.vote_average.toFixed(1) }}</p>
        <p class="release-date">Fecha de estreno: {{ serieInfo.first_air_date }}</p>
        <p class="overview">{{ serieInfo.overview }}</p>
        <p class="vote-count">Conteo de votos: {{ serieInfo.vote_count }}</p>
        <p class="vote-count">SEASONS: {{ serieInfo.seasons.length }}</p>

        <!-- Agregar a favoritos -->
        <div>
          <button v-if="!isFavorite" @click="addFavoriteSerie(serieInfo.id)">Añadir a favoritos</button>
          <button v-else @click="removeFavoriteSerie(serieInfo.id)">Eliminar de favoritos</button>
        </div>

        <h1>Calificar serie</h1>
        <div v-if="userRating === null">
          <h1>No has calificado esta serie</h1>
        </div>
        <div v-else>
          <h3>{{ userRating }}</h3>
        </div>
        <input v-model.number="userRating" type="number" min="1" max="10" />
        <button @click="submitRating(serieInfo.id)">Enviar Calificación</button>
        <br />
        <button @click="deleteRating(serieInfo.id)">Eliminar Calificación</button>
        <br />
        <button @click="selectSeriesFlag = false">Regresar</button>

        <!-- creditos -->
        <h2>Reparto principal</h2>
        <div class="multimedia-grid">
          <div class="multimedia-card" v-for="actor in credits" :key="actor.id">
            <img v-if="actor.profile_path" :src="`https://image.tmdb.org/t/p/w500${actor.profile_path}`" alt="Foto de actor" />
            <h3>{{ actor.name }}</h3>
            <p>Personaje: {{ actor.character }}</p>
          </div>
        </div>

      </div>

      <!-- Home -->
      <div v-else>
        <h1>Bienvenido, {{ username }}</h1>
        <h2>Series populares:</h2>
        <div class="multimedia-grid">
          <div @click="selectSeries(series)" class="multimedia-card" v-for="series in seriesList" :key="series.id">
            <img :src="`https://image.tmdb.org/t/p/w500${series.poster_path}`" />
            <h3>{{ series.original_name }}</h3>
            <p>{{ series.first_air_date }}</p>
            <p class="calif">Calificación: {{ series.vote_average.toFixed(1) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import SeriesService from "../services/seriesService";
import AuthService from "../services/authService";
import AddRatingService from "../services/addRatingService";
import SerieInfoService from "../services/serieInfoService";
import AddFavoriteService from "../services/addFavoriteService";
import CreditsService from "../services/creditsService";

export default {
  data() {
    return {
      acceso: false,
      selectSeriesFlag: false,
      userRating: null,
      isFavorite: false,
      username: "00Doncan",
      password: "",
      apiKey: "206a1b644898f56c99e9b15f454cfdd7",
      seriesList: [],
      serieInfo: {},
      credits: [],
      seriesService: null,
      authService: null,
      addRatingService: null,
      addFavoriteService: null,
      serieInfoService: null,
      creditsService: null,
    };
  },
  created() {
    this.seriesService = new SeriesService(this.apiKey);
    this.authService = new AuthService(this.apiKey);
    this.addRatingService = new AddRatingService();
    this.serieInfoService = new SerieInfoService();
    this.addFavoriteService = new AddFavoriteService();
    this.creditsService = new CreditsService(this.apiKey);
  },
  methods: {
    async onSubmit() {
      if (this.username && this.password) {
        try {
          await this.authService.validateLogin(this.username, this.password);
          this.acceso = true;
          await this.fetchSeries();
        } catch (error) {
          alert("Inténtalo de nuevo 😠😡");
        }
      } else {
        alert("Ingresa datos 😠😡");
      }
    },
    selectSeries(series) {
      this.selectedSeries = series;
      this.selectSeriesFlag = true;
      this.fetchSerieInfo(series.id);
    },
    async fetchSeries() {
      try {
        this.seriesList = await this.seriesService.getPopularSeries();
      } catch (error) {
        console.error("Error al obtener series:", error);
      }
    },
    async fetchSerieInfo(serieId) {
      try {
        this.serieInfo = await this.serieInfoService.getSerieInfo(serieId);
        await this.fetchUserRating(serieId);
        await this.checkIfFavorite(serieId);
        await this.fetchCredits(serieId);
      } catch (error) {
        console.error("Error al obtener la información de la serie:", error);
      }
    },
    async fetchUserRating(serieId) {
      try {
        const response = await this.addRatingService.getUserRating(serieId);
        this.userRating = response.value || null;
      } catch (error) {
        console.error("Error al obtener la calificación del usuario:", error);
        this.userRating = null;
      }
    },
    async submitRating(serieId) {
      try {
        await this.addRatingService.rateSerie(serieId, this.userRating);
        alert("Calificación enviada exitosamente!");
      } catch (error) {
        alert("Error al enviar la calificación.");
      }
    },
    async deleteRating(serieId) {
      try {
        await this.addRatingService.deleteRating(serieId);
        alert("Calificación eliminada exitosamente!");
        this.userRating = null;
      } catch (error) {
        alert("Error al eliminar la calificación.");
      }
    },
    async addFavoriteSerie(serieId) {
      try {
        await this.addFavoriteService.addFavoriteSerie(serieId);
        this.isFavorite = true;
        alert("Serie añadida a favoritos!");
      } catch (error) {
        alert("Error al añadir la serie a favoritos.");
      }
    },
    async removeFavoriteSerie(serieId) {
      try {
        await this.addFavoriteService.removeFavoriteSerie(serieId);
        this.isFavorite = false;
        alert("Serie eliminada de favoritos!");
      } catch (error) {
        alert("Error al eliminar la serie de favoritos.");
      }
    },
    async checkIfFavorite(serieId) {
      try {
        const isFavorite = await this.addFavoriteService.checkIfFavorite(serieId);
        this.isFavorite = isFavorite;
      } catch (error) {
        console.error("Error al verificar si la serie es favorita:", error);
      }
    },
    async fetchCredits(serieId) {
      try {
        const response = await this.creditsService.getCredits(serieId);
        this.credits = response.cast;
      } catch (error) {
        console.error("Error al obtener los créditos:", error);
      }
    },
  },
};
</script>

