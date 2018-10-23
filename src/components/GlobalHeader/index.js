import React, { PureComponent } from "react";
import styles from "./index.less";
import { Icon } from "antd";
import RightContent from "./RightContent";

class GlobalHeader extends PureComponent {
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
  };

  render() {
    const { collapsed } = this.props;
    return (
      <div className={styles.header}>
        <Icon
          className={styles.trigger}
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.toggle}
        />
        <RightContent />
      </div>
    );
  }
}

export default GlobalHeader;
