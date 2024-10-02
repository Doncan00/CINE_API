class AddFavoriteService {
  constructor() {
    this.baseUrl = "https://api.themoviedb.org/3/account";
    this.bearerToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDZhMWI2NDQ4OThmNTZjOTllOWIxNWY0NTRjZmRkNyIsIm5iZiI6MTcyNzIzNjMyNC43NTkwNTgsInN1YiI6IjY0YjcxZTJiMDI4ZjE0MDBjNTY2M2ZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tewIJotP57asiEOkdaYcReiT8tW3TibsKLr7wq9xikA";
    this.accountId = "20169325";
  }

  async addFavoriteSerie(serieId, favorite = true) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${this.bearerToken}`);

    const raw = JSON.stringify({
      media_type: "tv",
      media_id: serieId,
      favorite: favorite,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${this.baseUrl}/${this.accountId}/favorite`, requestOptions);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error al añadir la serie como favorita:", error);
      throw error;
    }
  }

  async removeFavoriteSerie(serieId) {
    return await this.addFavoriteSerie(serieId, false);
  }
}

export default AddFavoriteService;
