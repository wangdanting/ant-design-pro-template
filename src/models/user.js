export default {
  namespaced: 'user',

  state: {
    currentUser: {},
  },

  reducers: {
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        }
      }
    }
  }
}