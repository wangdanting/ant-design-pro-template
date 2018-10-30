import React, { Fragment } from "react";
import DocumentTitle from "react-document-title";
import memoizeOne from "memoize-one";
import isEqual from "lodash/isEqual";
import pathToRegexp from "path-to-regexp";
import { formatMessage } from "umi/locale";
import { ContainerQuery } from "react-container-query";
import Context from "./MenuContext";
import classNames from "classnames";
import { Layout } from "antd";
import SiderMenu from "@/components/SiderMenu";
import logo from "@/assets/logo.svg";
import Authorized from "@/utils/Authorized";
import { connect } from "dva";
import { enquireScreen, unenquireScreen } from "enquire-js";
import Header from "./Header";
import Exception403 from "../pages/Exception/403";

const { Content } = Layout;

// Conversion router to menu
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      let locale = "menu";
      if (parentName && item.name) {
        locale = `${parentName}.${item.name}`;
      } else if (item.name) {
        locale = `menu.${item.name}`;
      } else if (parentName) {
        locale = parentName;
      }

      if (item.path) {
        const result = {
          ...item,
          locale,
          authority: item.authority || parentAuthority
        };
        if (item.routes) {
          const children = formatter(item.routes, item.authority, locale);
          // Reduce memory usage
          result.children = children;
        }
        delete result.routes;
        return result;
      }

      return null;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

const query = {
  "screen-xs": {
    maxWidth: 575
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199
  },
  "screen-xl": {
    minWidth: 1200,
    maxWidth: 1599
  },
  "screen-xxl": {
    minWidth: 1600
  }
};

@connect(({ global, setting }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  ...setting
}))
class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
  }

  state = {
    isMobile: false,
    menuData: this.getMenuData()
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "user/fetchCurrent"
    });
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile
        });
      }
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  getMenuData() {
    const {
      route: { routes }
    } = this.props;
    return memoizeOneFormatter(routes);
  }

  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }

  matchParamsPath = pathname => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname)
    );
    return this.breadcrumbNameMap[pathKey];
  };

  getPageTitle = pathname => {
    const currRouterData = this.matchParamsPath(pathname);

    if (!currRouterData) {
      return "Ant Design Pro";
    }

    const message = formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name
    });

    return `${message} - Ant Design Pro`;
  };

  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap
    };
  }

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: "global/changeLayoutCollapsed",
      payload: collapsed
    });
  };

  getLayoutStyle = () => {
    const { isMobile } = this.state;
    const { fixSiderbar, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== "topmenu" && !isMobile) {
      return {
        paddingLeft: collapsed ? "80px" : "256px"
      };
    }
    return null;
  };

  getContentStyle = () => {
    const { fixedHeader } = this.props;
    return {
      paddingTop: fixedHeader ? 64 : 0
    };
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      location: { pathname },
      children
    } = this.props;
    const { menuData } = this.state;
    const isTop = PropsLayout === "topmenu";
    const routerConfig = this.matchParamsPath(pathname);

    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            Authorized={Authorized}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: "100vh"
          }}
        >
          <Header
            handleMenuCollapse={this.handleMenuCollapse}
            {...this.props}
          />
          <Content style={this.getContentStyle()}>
            <Authorized
              authority={routerConfig && routerConfig.authority}
              noMatch={<Exception403 />}
            >
              {children}
            </Authorized>
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <Fragment>
        <DocumentTitle title={this.getPageTitle(pathname)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </Fragment>
    );
  }
}

export default BasicLayout;
