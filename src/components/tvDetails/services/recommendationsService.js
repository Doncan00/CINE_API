class RecommendationsService {
    constructor() {
      this.baseUrl = "https://api.themoviedb.org/3/tv";
      this.bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDZhMWI2NDQ4OThmNTZjOTllOWIxNWY0NTRjZmRkNyIsIm5iZiI6MTcyNzIzNjMyNC43NTkwNTgsInN1YiI6IjY0YjcxZTJiMDI4ZjE0MDBjNTY2M2ZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tewIJotP57asiEOkdaYcReiT8tW3TibsKLr7wq9xikA"; // Tu Bearer Token
    }
  
    async getRecommendations(serieId) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${this.bearerToken}`);
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
  
      try {
        const response = await fetch(`${this.baseUrl}/${serieId}/recommendations`, requestOptions);
        const result = await response.json();
        return result.results; // Devuelve solo el array de resultados
      } catch (error) {
        console.error("Error al obtener las recomendaciones:", error);
        throw error;
      }
    }
  }
  
  export default RecommendationsService;
  