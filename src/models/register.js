import { fakeRegister } from "@/services/api";
import { setAuthority } from "@/utils/authority";

export default {
  namespaced: 'register',

  state: {
    status: undefined
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      yield put({
        type: "registerHandle"
      });
    }
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority("user");
      return {
        ...state,
        status: payload.status
      };
    }
  }
};
