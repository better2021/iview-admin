import axios from '@/libs/api.request'
import { setToken, getToken, localSave, localRead } from '@/libs/util'

const userInfo = localRead('userInfo')

export default {
  state: {
    userInfo: userInfo ? JSON.parse(userInfo) : {}, // 用户信息
    access: [], // 权限信息
    token: getToken()
  },
  mutations: {
    ['user/setUserInfo'](state, userInfo) {
      state.userInfo = userInfo
      localSave('userInfo', JSON.stringify(userInfo))
    },
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
      try {
        const res = await axios.request({
          method: 'POST',
          url: '/admin/login',
          data: req
        })
        const userInfo = res.data.list
        localSave('u_p', `${username}_${password}`)
        commit('user/setToken', res.data.token.trim())
        commit('user/setUserInfo', userInfo)
      } catch(err) {
        console.log(err)
      }
    },
    // 退出登录
    async ['user/handleLogOut']({ state, commit }) {
      commit('user/setToken', '')
      commit('user/setUserInfo', {})
    }
  }
}
