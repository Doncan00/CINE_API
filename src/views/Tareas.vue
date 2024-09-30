<template>
  <div>
    <form @submit.prevent="onSubmit" v-if="!acceso">
      <input v-model="username" placeholder="username" type="text" />
      <input v-model="password" placeholder="password" type="password" />
      <button type="submit">Ingresar</button>
    </form>

    <div v-else>
      <div v-if="selectSeriesFlag" class="selectedMultimedia">
    <img :src="`https://image.tmdb.org/t/p/w500${serieInfo.backdrop_path}`" class="multimedia-image" alt="Series Poster" />
    <h1>{{ serieInfo.original_name }}</h1>
    <p>Calificación promedio: {{ serieInfo.vote_average.toFixed(1) }}</p>
    <p class="release-date">Fecha de estreno: {{ serieInfo.first_air_date }}</p>
    <p class="overview">{{ serieInfo.overview }}</p>
    <p class="vote-count">Conteo de votos: {{ serieInfo.vote_count }}</p>
    <p class="vote-count">Total de episodios: {{ serieInfo.number_of_episodes }}</p>
    <p class="vote-count">Número de temporadas: {{ serieInfo.number_of_seasons }}</p>
    <p class="genres">Géneros: 
        <span v-for="(genre, index) in serieInfo.genres" :key="genre.id">
            {{ genre.name }}<span v-if="index < serieInfo.genres.length - 1">, </span>
        </span>
    </p>
    <p class="status">Estado: {{ serieInfo.status }}</p>
    <p class="tagline">Tagline: {{ serieInfo.tagline }}</p>
    <p class="homepage">Página oficial: <a :href="serieInfo.homepage" target="_blank">{{ serieInfo.homepage }}</a></p>

    <h1>Calificar serie</h1>
    <br>
    <h1>Tu calificación:
        <div v-if="userRating === null">
            <h1>No has calificado esta serie</h1>
        </div>
        <div v-else>
            <h3>{{ userRating }}</h3>
        </div>
    </h1>
    <br>

    <input v-model.number="userRating" type="number" min="1" max="10" />
    <button @click="submitRating(serieInfo.id)">Enviar Calificación</button>
    <br>
    <button @click="deleteRating(serieInfo.id)">Eliminar Calificación</button>
    <br>
    <button @click="selectSeriesFlag = false">Regresar</button>
</div>

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

export default {
  data() {
    return {
      acceso: false,
      selectSeriesFlag: false,
      userRating: null,
      username: "00Doncan",
      password: "",
      apiKey: "206a1b644898f56c99e9b15f454cfdd7",
      seriesList: [],
      serieInfo: {},
      seriesService: null,
      authService: null,
      addRatingService: null,
      serieInfoService: null,
    };
  },
  created() {
    this.seriesService = new SeriesService(this.apiKey);
    this.authService = new AuthService(this.apiKey);
    this.addRatingService = new AddRatingService();
    this.serieInfoService = new SerieInfoService();
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
  },
};
</script>
