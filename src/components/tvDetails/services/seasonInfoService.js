export default class SeasonInfoService {
    constructor() {
      this.baseUrl = "https://api.themoviedb.org/3";
      this.bearerToken =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDZhMWI2NDQ4OThmNTZjOTllOWIxNWY0NTRjZmRkNyIsIm5iZiI6MTcyNzIzNjMyNC43NTkwNTgsInN1YiI6IjY0YjcxZTJiMDI4ZjE0MDBjNTY2M2ZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tewIJotP57asiEOkdaYcReiT8tW3TibsKLr7wq9xikA";
    }
  
    async getSeasonInfo(serieId, seasonId) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", this.bearerToken);
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
  
      const response = await fetch(
        `${this.baseUrl}/tv/${serieId}/season/${seasonId}`,
        requestOptions
      );
  
      if (!response.ok) {
        throw new Error(`Error fetching season info: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    }
  }
  