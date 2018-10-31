import { parse, stringify } from "qs";
import nzh from "nzh/cn";
export function isAntdPro() {
  return window.location.hostname === "preview.pro.ant.design";
}

export function getPageQuery() {
  return parse(window.location.href.split("?")[1]);
}

export function digitUppercase(n) {
  return nzh.toMoney(n);
}
