<template>
    <div class="navbar"></div>
    <div id="main" class="login-container">
      <h2>Entrar a tu cuenta</h2>
      <p>
        Para poder editar y valorar, así como obtener recomendaciones personalizadas, deberás acceder con tu cuenta. Si no tienes una, registrarse para obtenerla es gratis y simple.
      </p>
      <br>
      <form v-if="!acceso" @submit.prevent="onSubmit" class="login-form">
        <div class="input-group">
          <label for="username">Nombre de usuario: </label>
          <input v-model="username" id="username" placeholder="Nombre de usuario" name="username">
        </div>
  
        <div class="input-group">
          <label for="password">Contraseña: </label>
          <input v-model="password" id="password" placeholder="Contraseña" type="password" name="password">
        </div>
  
        <button type="submit" class="login-btn">Iniciar Sesión</button>
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
  .navbar{
    width: 110%;
    height: 70px;
    margin: -8px;
    background-color: #032541;
  }
  
  .login-container {
    margin-right: 5%;
    margin-left: 5%;
    padding: 20px;
    text-align: left;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  h2 {
    color: #111;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 14px;
    line-height: 1.5;
    color: #666;
    margin-bottom: 20px;
  }
  
  .login-form {
    border-radius: 4px;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .input-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .login-btn {
    width: 150px;
    background-color: #38bdf8;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .login-btn:hover {
    background-color: #0284c7;
  }
  
</style>