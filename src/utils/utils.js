import { parse, stringify } from 'qs';
export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}