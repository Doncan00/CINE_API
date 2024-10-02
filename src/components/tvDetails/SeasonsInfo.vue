<template>
  <div>
    <h1>Detalles de la Temporada {{ tempId }}</h1>
    <!-- Aquí puedes mostrar la información de la temporada -->
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  
  
  mounted() {
    const route = useRoute()
    const serieId = route.params.id;
    const tempId = route.params.seasonId;
    this.fetchSeasonDetails(); // Llama a tu método para obtener detalles de la temporada
  },

  methods: {
    async fetchSeasonDetails() {
      // Aquí puedes usar el serieId y tempId para hacer tu API call
      try {
        const response = await yourSeasonService.getSeasonInfo(this.serieId, this.tempId);
        // Procesa la respuesta y guarda la información en data()
      } catch (error) {
        console.error("Error al obtener detalles de la temporada:", error);
      }
    },
  },
};
</script>
