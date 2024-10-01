<script setup>

    const props = defineProps({
        backdrop_path: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        release_date: {
            type: String,
            required: true
        },
        overview: {
            type: String,
            required: true
        }
    })

</script>

<template>

    <div class="movie-card">
        <div class="image">
            <img :src="'https://image.tmdb.org/t/p/w500' + backdrop_path" alt="">
        </div>

        <div class="details">
            <div class="title-release_date">
                <h1>{{ title }}</h1>
                <h2>{{ release_date }}</h2>
            </div>
            <p>{{ overview }}</p>
        </div>
    </div>

</template>

<style scoped>
/* Estilos para las tarjetas de película */
.movie-card {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
  transition: transform 0.3s ease;
  padding: 15px;
  font-family: 'Arial', sans-serif; 
}

.movie-card:hover {
  transform: scale(1.02);
}

/* Estilos para la imagen de la película */
.image img {
  width: 90px; 
  height: 135px; 
  object-fit: cover;
  border-radius: 8px;
}

/* Estilos para los detalles de la película */
.details {
  padding-left: 15px;
  flex-grow: 1;
}

.title-release_date h1 {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #000; 
}

.title-release_date h2 {
  font-size: 14px;
  font-weight: normal;
  margin: 5px 0;
  color: #999;
  font-style: italic;
}

.details p {
  font-size: 15px; 
  color: #333; 
  line-height: 1.5;
  margin: 10px 0 0;
}

/* Estilo adicional si necesitas ajustar el texto largo */
.details p {
  display: -webkit-box;
  line-clamp: 3; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
