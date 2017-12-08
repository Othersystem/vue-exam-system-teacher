import config from '../config'

const baseURL = config.baseURL;
console.log(baseURL)
const axios = require('axios').create({
  baseURL: baseURL,            //api请求的baseURL
  timeout: 10000,
  withCredentials: true, // 允许跨域 cookie
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  transformResponse: [function (data) {
    let json = {};
    try {
      json = JSON.parse(data);
    } catch (e) {
      json = {};
    }
    console.log(data)
    if(json.status === -2){    //登录过期
      localStorage.removeItem('teacherNo');
      location.reload();// 为了重新实例化vue-router对象 避免bug
    }
    return json;
  }]
})
axios.defaults.headers.post['Content-Type'] = 'application/json';
// get
export const _get = (req) => {
  return axios.get(req.url, {params: req.data})
}

// post
export const _post = (req) => {
  let data = req.data;
  let root = new FormData();
  for (let key of Object.keys(data)) {
    root.append(key, data[key]);
  }
  req.data = root;
  return axios({method: 'post', url: `/${req.url}`, data: req.data})
}

//patch
export const _put = (req) => {
  return axios({method: 'put', url: `/${req.url}`, data: req.data})
}
