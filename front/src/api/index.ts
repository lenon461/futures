import axios from "./axios";
// import Chart from "./chart"
export default {
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
