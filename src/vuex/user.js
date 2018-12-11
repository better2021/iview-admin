const userInfo = window.localStorage.getItem('userInfo');

export default {
  state: {
    userInfo: userInfo && userInfo !== 'undefined' ? JSON.parse(userInfo) : {},
    latelyRoutes: []
  },
  mutations: {
    'user/latelyRoutes'(state, payload) {
      state.latelyRoutes = payload;
    }
  }
};
