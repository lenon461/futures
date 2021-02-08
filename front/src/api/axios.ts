/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";

const { hostname } = window.location;
const baseURL = "//api.${hostname}/v1/";

const instance = axios.create({
  baseURL: "//localhost:5002",
  timeout: 1000
});

export const setAuthorization = access_token => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
};
// 요청 인터셉터 추가
export const addReqInterceptor = access_token => {
  instance.interceptors.request.use(
    function(config) {
      console.log("before config");
      console.log(config.headers);
      config.headers = {
        Authorization: `Bearer ${access_token}`
      };
      console.log("after config");
      console.log(config.headers);
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
};

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

setAuthorization("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTI3NTI4MjIsImV4cCI6MTYxMjc1NTIyMn0.bJSjpPmNa4blpvUPdZbgPx6bLa9m7E5kU75EQ2hTEDU");

const cxios = instance;
export default cxios;
