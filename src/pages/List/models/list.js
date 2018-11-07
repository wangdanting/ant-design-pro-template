import {
  queryFakeList,
  removeFakeList,
  addFakeList,
  updateFakeList
} from "@/services/api";
export default {
  namespaced: "list",

  state: {
    list: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: "queryList",
        payload: Array.isArray(response) ? response : []
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback =
          Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload);
      yield put({
        type: "queryList",
        payload: response
      });
    }
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload
      };
    }
  }
};
