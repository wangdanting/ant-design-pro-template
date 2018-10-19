import React, { PureComponent } from "react";
import { Layout } from "antd";
import classNames from "classnames";
import styles from "index.less";
import Link from 'umi/link';
import BaseMenu from './BaseMenu';

const { Sider } = Layout;

export default class SiderMenu extends PureComponent {
  render() {
    const {logo, collapsed, onCollapse, theme, fixSiderbar } = this.props;
    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderbar]: fixSiderbar,
      [styles.light]: theme === "light"
    });

    return (
      <Sider
        trigger={null}
        collapsible
        collapse={collapse}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        <div className={styles.logo} id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>

      </Sider>
    );
  }
}
