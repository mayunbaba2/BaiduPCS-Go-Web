import axios from "axios";

// 创建axios实例
const service = axios.create({
  //   baseURL: baseUrl, // api的base_url
  // timeout: 5000, // 请求超时时间
});

// service.interceptors.request.use((config) => {
//   if (store.state.auth.token) {
//     config.headers.Authorization = `Bearer ${store.state.auth.token}`; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
//   }
//   return config;
// }, (error) => {
//   Promise.reject(error);
// });

// respone拦截器
service.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error("Unknown error");
    }
    return Promise.reject(error);
  }
);

export default service;
