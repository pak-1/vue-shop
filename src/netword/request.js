import axios from "axios";

export function request(config) {
  //1. 创建axios的实例
  const instance1 = axios.create({
    baseURL: "http://www.ysqorz.top:8888/api/private/v1/",
    timeout: 5000,
  });

  //2.1请求拦截
  instance1.interceptors.request.use(
    config => {
      console.log(config);
      config.headers.Authorrization = window.sessionStorage.getItem("token");
      // 对config的一些操作
      //   1.比如config中的一些信息不符合服务器的要求
      //   2.每次发送请求时，显示一个请求图标
      //   3.某些网络请求，须携带一些特殊信息
      return config; //必须返回，才能发送请求，不然被拦截
    },
    err => {
      console.log(err);
    }
  );

  //   2.2响应拦截
  instance1.interceptors.response.use(
    res => {
      return res.data;
    },
    err => {
      console.log(err);
    }
  );

  return instance1(config); //instance1是一个promise，可以直接返回，不用创建
}

// export function request(config) {
//   return new Promise((resolve, reject) => {
//     //1. 创建axios的实例
//     const instance1 = axios.create({
//       baseURL: "http://123.207.32.32:8000",
//       timeout: 5000,
//     });
//     //发送网络请求
//     instance1(config)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }
