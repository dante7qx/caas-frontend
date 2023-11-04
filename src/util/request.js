import { Notification, MessageBox, Message } from 'element-ui'

const baseURL = "/api";
const timeout = 10000;

const headers = new Headers({
  Accept: "application/json",
  'Content-Type': 'application/json',
});

// 设置拦截器，参考: https://blog.logrocket.com/axios-vs-fetch-best-http-requests
fetch = ((originalFetch) => {
  return (...args) => {
    const result = originalFetch.apply(this, args);
    return result.then((response) => {
      const status = response.status;
      const msg = response.statusText
      if(status === 401) {
        MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('跳转到登录页面！')
        }).catch(() => {
          console.log('取消重新登录！')
        });
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
      } else if(status === 500) {
        Message({
          message: msg,
          type: 'error'
        })
        return Promise.reject(new Error(msg))
      } else if(status !== 200) {
        Notification.error({
          title: msg
        })
        return Promise.reject('error')
      } else {
        return response;
      }


    });
  };
})(fetch);

const fetchClient = {
  get(url) {
    const fullURL = baseURL + url;
    return fetch(fullURL, {
      method: 'GET',
      headers,
      timeout: timeout,
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Fetch GET Error:', error);
        throw error;
      });
  },
  post(url, data) {
    const fullURL = baseURL + url;
    const param = {
      method: 'POST',
      headers,
      timeout: timeout
    }
    if(data != null) {
      param['body'] = JSON.stringify(data) // 将数据转换为 JSON 字符串
    }
    return fetch(fullURL, param)
      .then(response => response.json())
      .catch(error => {
        console.error('Fetch POST Error:', error);
        throw error;
      });
  },
};

export default fetchClient
