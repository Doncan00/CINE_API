<template>
  <div>
    <form @submit.prevent="onSubmit" v-if="!acceso">
      <input v-model="username" placeholder="username" type="text" />
      <input v-model="password" placeholder="password" type="password" />
      <button type="submit">Ingresar</button>
    </form>

    <div v-else>
      <div v-if="selectSeriesFlag" class="selectedMultimedia">
        <img :src="`https://image.tmdb.org/t/p/w500${selectedSeries.backdrop_path}`" class="multimedia-image" alt="Series Poster" />
        <h1>{{ selectedSeries.original_name }}</h1>
        <p class="vote-average">Calificación: {{ selectedSeries.vote_average.toFixed(1) }}</p>
        <p class="release-date">Fecha de estreno: {{ selectedSeries.first_air_date }}</p>
        <p class="overview">{{ selectedSeries.overview }}</p>
        <p class="vote-count">Conteo de votos: {{ selectedSeries.vote_count }}</p>

        <h1>Calificar serie</h1>
        <br>
        <h1>Tu calificación: 
          <div v-if="rating == 0"> <h1>No has calificado esta serie</h1> </div>
          <div v-else> <h3>{{ rating }}</h3></div>
        </h1>
        <br>
        <input v-model.number="rating" type="number" min="1" max="10" />
        <button @click="submitRating(selectedSeries.id)">Enviar Calificación</button>
        <br>
        <button @click="deleteRating(selectedSeries.id)">Eliminar Calificación</button>
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

export default {
  data() {
    return {
      acceso: false,
      selectSeriesFlag: false,
      rating: 1,
      username: "00Doncan",
      password: "",
      apiKey: "206a1b644898f56c99e9b15f454cfdd7",
      seriesList: [],
      selectedSeries: null,
      seriesService: null,
      authService: null,
      addRatingService: null,
    };
  },
  created() {
    this.seriesService = new SeriesService(this.apiKey);
    this.authService = new AuthService(this.apiKey);
    this.addRatingService = new AddRatingService();
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
    },
    async fetchSeries() {
      try {
        this.seriesList = await this.seriesService.getPopularSeries();
      } catch (error) {
        console.error("Error al obtener series:", error);
      }
    },
    async submitRating(seriesId) {
      try {
        await this.addRatingService.rateSeries(seriesId, this.rating);
        alert("Calificación enviada exitosamente!");
      } catch (error) {
        alert("Error al enviar la calificación.");
      }
    },
    async deleteRating(seriesId) {
      try {
        await this.addRatingService.deleteRating(seriesId);
        alert("Calificación eliminada exitosamente!");
        this.selectedSeries.vote_average = null;
      } catch (error) {
        alert("Error al eliminar la calificación.");
      }
    },
  },
};
</script>
