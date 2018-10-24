import { queryNotices } from "@/services/api";

export default {
  namespaced: "global",

  state: {
    collapsed: false,
    notices: []
  },

  effects: {
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: "saveNotices",
        payload: data
      });
      yield put({
        type: "user/changeNotifyCount",
        payload: data.length
      });
    }
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload
      };
    }
  }
};
