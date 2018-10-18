import React, { Fragment } from "react";
import DocumentTitle from "react-document-title";
import memoizeOne from "memoize-one";
import isEqual from "lodash/isEqual";
import pathToRegexp from "path-to-regexp";
import { formatMessage } from "umi/locale";
import { ContainerQuery } from "react-container-query";
import Context from "./MenuContext";
import classNames from "classnames";

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

  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap
    };
  }

  render() {
    const {
      location: { pathname },
      children
    } = this.props;

    return (
      <Fragment>
        <DocumentTitle title={this.getPageTitle(pathname)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)} />
              </Context.Provider>
            )}
          </ContainerQuery>
          {/* {children} */}
        </DocumentTitle>
      </Fragment>
    );
  }
}

export default BasicLayout;
