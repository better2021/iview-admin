import axios from 'axios'
import store from '@/store'
// import { Spin } from 'iview'
const addMsg = errorInfo => {
  const {
    statusText,
    status,
    request: { responseURL },
    data: { message }
  } = errorInfo
  let info = {
    type: 'error',   
    code: status,   
    mes: statusText,
    url: responseURL,
    message
  }
  store.commit('app/addMsg', info)
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url)
        const response = res.data
        response.status = res.status
        return response
      },
      error => {
        this.destroy(url)
        addMsg(error.response)
        return Promise.reject(error)
      }
    )
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
