import axios from 'axios'

export default function ajax(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise;
    if (method === 'GET') {
      let dataStr = '';
      Object.keys(data).forEach(k => {
        dataStr += k + '=' + data[k] + '&'
      });
      if (dataStr) {
        dataStr.substring(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
      }
      promise = axios.get(url);
    } else {
      promise = axios.post(url, data);
    }
    promise.then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  })
}
