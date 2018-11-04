import request from "@/utils/request";
import { stringify } from "querystring";

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function fakeAccountLogin(params) {
  return request("/api/login/account", {
    method: "POST",
    body: params
  });
}

export async function fakeRegister(params) {
  return request("/api/register", {
    method: "POST",
    body: params
  });
}

export async function queryNotices() {
  return request("/api/notices");
}

export async function fakeSubmitForm(params) {
  return request("/api/forms", {
    method: "POST",
    boby: params
  });
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function addRule(params) {
  return request("api/rule", {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

export async function removeRule(params) {
  return request("/api/rule", {
    method: "POST",
    body: {
      ...params,
      method: "delete"
    }
  });
}
