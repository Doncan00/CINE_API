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

        <!-- Creditos -->
        <h2>Reparto principal</h2>
<div class="slider">
  <div class="slider-wrapper">
    <div class="multimedia-grid">
      <div class="multimedia-card" v-for="actor in credits" :key="actor.id">
        <img v-if="actor.profile_path" :src="`https://image.tmdb.org/t/p/w500${actor.profile_path}`" alt="Foto de actor" />
        <h3>{{ actor.name }}</h3>
        <p>Personaje: {{ actor.character }}</p>
      </div>
    </div>
  </div>
</div>

        <!-- Palabras clave -->
        <h2>Palabras clave</h2>
        <div class="multimedia-grid">
          <div class="keyword-card" v-for="keyword in keywords" :key="keyword.id">
            {{ keyword.name }}
            <!-- <h3>{{ keyword.id }}</h3> -->
          </div>
        </div>
        <br>
        Trailer
        <div v-if="videos.length">
  <h2>Official Trailers</h2>
  <div v-for="video in videos.filter(video => video.type === 'Trailer' && video.name.includes('Official Trailer'))" :key="video.id">
    <h3>{{ video.name }}</h3>
    <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${video.key}`" frameborder="0" allowfullscreen></iframe>
  </div>
</div>




        <!-- recomendaciones -->
        <h2>Recomendaciones</h2>
<div class="slider">
  <div class="slider-wrapper">
    <div class="multimedia-grid">
      <div class="multimedia-card" v-for="recommendation in recommendations" :key="recommendation.id">
        <img :src="`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`" alt="Poster" />
        <h3>{{ recommendation.original_name }}</h3>
        <p>{{ recommendation.first_air_date }}</p>
        <p class="calif">Calificación: {{ recommendation.vote_average.toFixed(1) }}</p>
      </div>
    </div>
  </div>
</div>

        <!-- Temporadas -->
        <div>
          <h2>Temporadas:</h2>
          <ul>
    <div class="multimedia-grid">
      <div class="keyword-card" v-for="season in serieInfo.seasons" :key="season.id"
           @click="goToSeasonInfo(season.id)">
        {{ season.name }}
      </div>
    </div>
  </ul>
        </div>



        <br>
        <button @click="selectSeriesFlag = false">Regresar</button>

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
import SeriesService from "../tvDetails/services/seriesService";
import AuthService from "../tvDetails/services/authService";
import AddRatingService from "../tvDetails/services/addRatingService";
import SerieInfoService from "../tvDetails/services/serieInfoService";
import AddFavoriteService from "../tvDetails/services/addFavoriteService";
import CreditsService from "../tvDetails/services/creditsService";
import KeyWordsService from "../tvDetails/services/keyWordsService";
import VideoTeaserService from "../tvDetails/services/videoTeaserService";
import RecommendationsService from "../tvDetails/services/recommendationsService";
import SeasonsService from "../tvDetails/services/seasonsService";

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
      keywords: [],
      videos: [],
      recommendations: [],
      seasonsList: [],
      seriesService: null,
      authService: null,
      addRatingService: null,
      addFavoriteService: null,
      serieInfoService: null,
      creditsService: null,
      keyWordsService: null,
      videoTeaserService: null,
      recommendationsService: null,
      selectedSeason: null,
      seasonsService: null,
    };
  },
  created() {
    this.seriesService = new SeriesService(this.apiKey);
    this.authService = new AuthService(this.apiKey);
    this.addRatingService = new AddRatingService();
    this.serieInfoService = new SerieInfoService();
    this.addFavoriteService = new AddFavoriteService();
    this.creditsService = new CreditsService(this.apiKey);
    this.keyWordsService = new KeyWordsService();
    this.videoTeaserService = new VideoTeaserService();
    this.recommendationsService = new RecommendationsService();
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
        await this.fetchKeywords(serieId);
        await this.fetchVideos(serieId);
        await this.fetchRecommendations(serieId);
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
    async fetchKeywords(serieId) {
      try {
        const response = await this.keyWordsService.getKeywords(serieId);
        console.log("Respuesta de la API:", response);

        if (response && response.results && Array.isArray(response.results)) {
          this.keywords = response.results;
          console.log("Palabras clave obtenidas:", this.keywords);
        } else {
          console.warn("No se encontraron palabras clave.");
          this.keywords = [];
        }
      } catch (error) {
        console.error("Error al obtener las palabras clave:", error);
        this.keywords = [];
      }
    },
    async fetchVideos(serieId) {
      try {
        const response = await this.videoTeaserService.getVideos(serieId);
        this.videos = response.results;
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      }
    },
    async fetchRecommendations(serieId) {
      try {
        const response = await this.recommendationsService.getRecommendations(serieId);
        this.recommendations = response;
      } catch (error) {
        console.error("Error al obtener las recomendaciones:", error);
      }
    },
    goToSeasonInfo(tempId) {
  this.$router.replace({ name: 'TempDetails', params: { serieId: this.serieInfo.id, tempId } });
},

  },
};
</script>
