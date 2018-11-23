// https://umijs.org/zh/config/
import os from 'os';
import pageRoutes from './router.config';
import webpackplugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';

export default {
  plugins: [
    // 插件有参数时为数组，数组的第二项是参数，类似 babel 插件
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true
        },
        targets: {
          ie: 11
        },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index'
        },
        ...(!process.env.TEST && os.platform() === 'darwin'
          ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime']
            },
            hardSource: true
          }
          : {})
      }
    ]
  ],

  // 路由配置
  routes: pageRoutes,
  // 禁用 redirect 上提。
  disableRedirectHoist: true,
  // 兼容 ie11
  targets: {
    ie: 11
  },
  // 通过 webpack-chain 的 API 扩展或修改 webpack 配置。
  chainWebpack: webpackplugin,
  // 配置主题
  theme: {
    '@primary-color': defaultSettings.primaryColor
  },
  // 通过 webpack 的 DefinePlugin 传递给代码，值会自动做 JSON.stringify 处理
  define: {
    APP_TYPE: process.env.APP_TYPE || ''
  },
  // 代理请求到其他服务器
  proxy: {
    '/api': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      secure: true
    }
  },
  // 配置后会生成 manifest.json 当编译器(compiler)开始执行、解析和映射应用程序时，它会保留所有模块的详细要点
  manifest: {
    name: 'ant-design-pro',
    background_color: '#FFF',
    description:
      'An out-of-box UI solution for enterprise applications as a React boilerplate.',
    display: 'standalone',
    start_url: '/index.html',
    icons: [
      {
        src: '/favicon.png',
        sizes: '48x48',
        type: 'image/png'
      }
    ]
  },
  // 忽略 moment 的 locale 文件，用于减少尺寸
  ignoreMomentLocale: true,
  // 给 less-loader 的额外配置项
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  // 给 css-loader 的额外配置项
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    }
  },
  cssnano: {
    mergeRules: false
  }
};
