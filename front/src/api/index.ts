import axios from "./axios";
// import Chart from "./chart"
export default {
  Auth: {
    postLogin(body){
      return axios.post("/auth/login", body);
    }
  },
  User: {
    getProfile() {
      return axios.get("/users/profile")
    }
  },
  Summoners: {
    getSummoners() {
      return axios.get("/summoners");
    },
    getError() {
      return axios.get("/error");
    }
  },
  Chart: {
    getCandles(params: any) {
      return axios.get("/chart", {
        params
      });
    },
    getLPs(params: any) {
      return axios.get("/chart/lp", {
        params
      });
    }
  },
  Point: {
    getPoints(params: any) {
      return axios.get("/points/Hide on bush/chart", {
        params
      });
    }
  }
};
