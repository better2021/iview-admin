import axios from '@/libs/api.request'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    token: getToken(),
    access: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    async ['user/handleLogin']({ commit, dispatch }, { form, token }) {
      const { username, password, authcode } = form
      const req = {
        username,
        password,
        // code: authcode,
        token
      }
      const res = await axios.request({
        method: 'POST',
        url: '/admin/login',
        data: req
      })
      console.log('res-->', res)
    },
    // 退出登录
    async ['user/handleLogOut']({ state, commit }) {
      commit('setToken', '')
    }
  }
}
