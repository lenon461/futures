import axios from "axios";

const { hostname } = window.location;
const baseURL = "//api.${hostname}/v1/";

const instance = axios.create({
  baseURL: "//localhost:5002",
  timeout: 1000
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  function(config) {
    // console.log("config")
    // console.log(config)
    // 요청을 보내기 전에 수행할 일
    // ...
    return config;
  },
  function(error) {
    // console.log("req error")
    // console.log(error)
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
  function(response) {
    // console.log("response")
    // console.log(response)
    // 응답 데이터를 가공
    // ...
    return response;
  },
  function(error) {
    // console.log("res error")
    // console.log(error)
    // 오류 응답을 처리
    // ...
    return Promise.reject(error);
  }
);

const cxios = instance;
export default cxios;
