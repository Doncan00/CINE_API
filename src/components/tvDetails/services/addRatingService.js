class AddRatingService {
  constructor() {
    this.baseUrl = "https://api.themoviedb.org/3/tv";
    this.bearerToken =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDZhMWI2NDQ4OThmNTZjOTllOWIxNWY0NTRjZmRkNyIsIm5iZiI6MTcyNzIzNjMyNC43NTkwNTgsInN1YiI6IjY0YjcxZTJiMDI4ZjE0MDBjNTY2M2ZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tewIJotP57asiEOkdaYcReiT8tW3TibsKLr7wq9xikA";
  }

  async rateSerie(serieId, value) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${this.bearerToken}`);

    const raw = JSON.stringify({
      "value": value
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${this.baseUrl}/${serieId}/rating`, requestOptions);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error al calificar la serie:", error);
      throw error;
    }
  }

  async deleteRating(serieId) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.bearerToken}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${this.baseUrl}/${serieId}/rating`, requestOptions);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error al eliminar la calificación:", error);
      throw error;
    }
  }
}

export default AddRatingService;
