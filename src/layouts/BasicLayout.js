import React, { Fragment } from "react";
import DocumentTitle from "react-document-title";
import memoizeOne from "memoize-one";
import isEqual from "lodash/isEqual";
import pathToRegexp from "path-to-regexp";
import { formatMessage } from "umi/locale";

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

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
  }

  state = {
    menuData: this.getMenuData()
  };

  componentDidMount() {}

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

  render() {
    const {
      location: { pathname },
      children
    } = this.props;

    return (
      <Fragment>
        <DocumentTitle title={this.getPageTitle(pathname)}>
          {children}
        </DocumentTitle>
      </Fragment>
    );
  }
}

export default BasicLayout;
