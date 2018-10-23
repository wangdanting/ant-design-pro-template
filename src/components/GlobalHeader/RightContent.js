import React, { PureComponent } from "react";
import styles from "./index.less";
import HeaderSearch from "../HeaderSearch";
import classNames from 'classnames';

class GlobalHeaderRight extends PureComponent {
  render() {
    const { theme } = this.props;
    let className = styles.right;
    if (theme === "dark") {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <HeaderSearch className={classNames(styles.action, styles.search)} />
      </div>
    );
  }
}

export default GlobalHeaderRight;
