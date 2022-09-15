import axios from "axios";
const BASE_URL = "https://bidb-stoktakip.herokuapp.com/";
// https://nodejs.erciyes.edu.tr/
// http://localhost:8080/
// https://bidb-stoktakip.herokuapp.com/

export default axios.create({
    baseURL: BASE_URL,
});