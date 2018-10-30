import { fakeSubmitForm } from "@/services/api";
import { message } from "antd";
export default {
  namespaced: "form",

  state: {
    step: {
      payAccount: "ant-design@alipay.com",
      receiverAccount: "test@example.com",
      receiverName: "Alex",
      amount: "500"
    }
  },

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success("提交成功");
    }
  },

  reducers: {}
};
