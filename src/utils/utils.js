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

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return "";

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          styles={{
            position: "relative",
            top: -2,
            fontSize: 14,
            fontStyle: "normal",
            lineHeight: 20,
            marginLeft: 2
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}
