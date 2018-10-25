import React, { PureComponent } from "react";
import BreadcrumbView from "./breadcrumb";
import classNames from "classnames";
import styles from "./index.less";
import { Skeleton } from "antd";

class PageHeader extends PureComponent {
  render() {
    const {
      className,
      wide,
      loading = false,
      hiddenBreadcrumb = false
    } = this.props;
    const clsString = classNames(styles.pageHeader, className);
    return (
      <div className={clsString}>
        <div className={wide ? styles.wide : ""}>
          <Skeleton
            loading={loading}
            title={false}
            active
            paragraph={{ rows: 3 }}
            avatar={{ size: "large", shape: "circle" }}
          >
            {hiddenBreadcrumb ? null : <BreadcrumbView {...this.props} />}
          </Skeleton>
        </div>
      </div>
    );
  }
}

export default PageHeader;
