export default class SeriesService {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseUrl = "https://api.themoviedb.org/3";
      this.bearerToken =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDZhMWI2NDQ4OThmNTZjOTllOWIxNWY0NTRjZmRkNyIsIm5iZiI6MTcyNzIzNjMyNC43NTkwNTgsInN1YiI6IjY0YjcxZTJiMDI4ZjE0MDBjNTY2M2ZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tewIJotP57asiEOkdaYcReiT8tW3TibsKLr7wq9xikA";
    }
  
    async getPopularSeries() {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", this.bearerToken);
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
  
        const response = await fetch(
          `${this.baseUrl}/discover/tv?sort_by=popularity.desc`,
          requestOptions
        );
        const data = await response.json();
        return data.results;
      
    }
  }
  