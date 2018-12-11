import axios from '@/libs/api.request'
import { setToken, getToken, localSave } from '@/libs/util'

export default {
  state: {
    userInfo: {}, // 用户信息
    access: [], // 权限信息
    token: getToken()
  },
  mutations: {
    ['user/setUserInfo']() {},
    ['user/setToken'](state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    async ['user/handleLogin']({ commit }, { form, token }) {
      const { username, password, authcode } = form
      const req = {
        username,
        password,
        code: authcode,
        token
      }
      const res = await axios.request({
        method: 'POST',
        url: '/admin/login',
        data: req
      })
      console.log('res-->', res)
      localSave('u_p', `${username}_${password}`)
      commit('user/setToken', res.data.token.trim())
      commit('user/setUserInfo', JSON.stringify(res.data.list))
    },
    // 退出登录
    async ['user/handleLogOut']({ state, commit }) {
      commit('user/setToken', '')
    }
  }
}
