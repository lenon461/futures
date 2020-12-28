import axios from "axios";

const { hostname } = window.location;
const baseURL = "//api.${hostname}/v1/";

const instance = axios.create({
  baseURL: "//localhost:3000",
  timeout: 1000
});

const Comm = instance;

export default Comm;
