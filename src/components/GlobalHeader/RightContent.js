import React, { PureComponent } from "react";
import styles from "./index.less";
import HeaderSearch from "../HeaderSearch";
import classNames from "classnames";
import { formatMessage } from "umi/locale";
import { Tooltip, Icon } from "antd";

class GlobalHeaderRight extends PureComponent {
  render() {
    const { theme } = this.props;
    let className = styles.right;
    if (theme === "dark") {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <HeaderSearch
          className={classNames(styles.action, styles.search)}
          placeholder={formatMessage({ id: "component.globalHeader.search" })}
          dataSource={[
            formatMessage({ id: "component.globalHeader.search.example1" }),
            formatMessage({ id: "component.globalHeader.search.example2" }),
            formatMessage({ id: "component.globalHeader.search.example3" })
          ]}
          onSearch={value => {
            console.log("input", value); // eslint-disable-line
          }}
          onPressEnter={value => {
            console.log("enter", value); // eslint-disable-line
          }}
        />
        <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
      </div>
    );
  }
}

export default GlobalHeaderRight;
