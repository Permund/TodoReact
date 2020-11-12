import axios from "axios";
import {API_URL} from "../../Constants.js"


export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";

class AuthenticationService {
  executrBasicAuthenticationService(username, password) {
    return axios.get(`${API_URL}/basicauth`, {
      headers: { authorization: this.createBasicAuthToken(username, password) },
    });
  }

  executrJwtAuthenticationService(username, password) {
    return axios.post(`${API_URL}/authenticate`,{
      username,
      password
    } );
  }

  createBasicAuthToken(username, password) {
    let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);
    return basicAuthHeader;
  }

  registerSuccessfulLogin(username, password) {
    //let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);

    console.log("registerSuccessfulLogin");
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
  }

  registerSuccessfulLoginForJwt(username, token) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptors(this.createJWTToken(token));

  }

  createJWTToken(token) {
    sessionStorage.setItem("USER_TOKEN", "Bearer " + token );
    return "Bearer " + token;
  }

  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
      return false;
    } else {
      return true;
    }
  }


  getLoggedInUserName() {
    let userName = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (userName === null) return "";
    return userName;
  }

  setupAxiosInterceptors(token) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn()) {
        config.headers.authorization = token;
        //sessionStorage.setItem('authorization', token)
      }
      return config;
    });
  }

  

  
}



export default new AuthenticationService();
