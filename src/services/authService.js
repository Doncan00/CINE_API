
export default class AuthService {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseUrl = "https://api.themoviedb.org/3";
      this.bearerToken =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDZhMWI2NDQ4OThmNTZjOTllOWIxNWY0NTRjZmRkNyIsIm5iZiI6MTcyNzIzNjMyNC43NTkwNTgsInN1YiI6IjY0YjcxZTJiMDI4ZjE0MDBjNTY2M2ZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tewIJotP57asiEOkdaYcReiT8tW3TibsKLr7wq9xikA";
    }
    
    async validateLogin(username, password) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", this.bearerToken);
  
      const raw = JSON.stringify({
        username: username,
        password: password,
        request_token: ""
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      
        const response = await fetch(
          `${this.baseUrl}/authentication/token/validate_with_login`,
          requestOptions
        );
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        const result = await response.json();
        return result;
    }
  }
  