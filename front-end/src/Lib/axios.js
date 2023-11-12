import axios_ from "axios";


const axios =  axios_.create({
  baseURL: "http://localhost:8081",
});

// Set default Content-Type header
axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.baseURL = 'http://localhost:8081';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// export const request = (method, url, data) => {

//     let headers = {};
//     if (getAuthToken() !== null && getAuthToken() !== "null") {
//         headers = {'Authorization': `Bearer ${getAuthToken()}`};
//     }

//     return axios({
//         method: method,
//         url: url,
//         headers: headers,
//         data: data});
// };
export default axios;