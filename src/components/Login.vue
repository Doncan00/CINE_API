<template>
  <div id="main">
    <h2>Acceso super seguro</h2>

    <form v-if="!acceso" @submit.prevent="onSubmit">
      <fieldset>
        <label>Correo: </label>
        <input v-model="username" placeholder="user Here" name="">
      </fieldset>
      <fieldset>
        <label>Password: </label>
        <input v-model="password" placeholder="password Here" type="password" name="">
      </fieldset>
      <button type="submit">Acceder</button>
    </form>

    <h3 v-if="acceso">Has accedido correctamente.</h3>

  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      acceso: false,
      movies: []
    };
  },
  methods: {
    onSubmit() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTllNmRmNzc0N2VhMzBiZmQ2MmYxYjQ3M2VjYTRhYSIsIm5iZiI6MTcyNzI3NTM1Mi44NDcwMDQsInN1YiI6IjY2ZjJmNmU1YTk3ODgwMTQ4ZjNiOTE4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YI6X-bM247LYdTQisKH7KVZ-x1s_s1Pj1EOFwiMyp-Q");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "username": this.username,
        "password": this.password,
        "request_token": ""
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://api.themoviedb.org/3/authentication/token/validate_with_login", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.success) {
            this.acceso = true;
            //this.mostrarPeliculas();
            localStorage.setItem("user_log", JSON.stringify(result));
            console.log(result);
          }
        })
        .catch(error => console.log('error', error));
    },
  }
};
</script>

<style scoped>
</style>
