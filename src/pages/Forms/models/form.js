import { fakeSubmitForm } from "@/services/api";
import { message } from "antd";
export default {
  namespaced: "form",

  state: {},

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success("提交成功");
    }
  },

  reducers: {}
};
