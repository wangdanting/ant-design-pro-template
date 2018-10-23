import React, { PureComponent } from "react";
import { Layout } from "antd";
import { connect } from "dva";
import styles from "./Header.less";
import GlobalHeader from "@/components/GlobalHeader";

const { Header } = Layout;

@connect(({ setting, global }) => ({
  setting,
  collapsed: global.collapsed
}))
class HeaderView extends PureComponent {
  state = {
    visible: true
  };

  // getHeaderWidth = () => {
  //   const { collapsed } = this.props;
  //   return collapsed ? "calc(100% - 80px)" : "calc(100% - 256px)";
  // };

  render() {
    const { setting, handleMenuCollapse } = this.props;
    const { fixedHeader } = setting;
    const { visible } = this.state;
    // const width = this.getHeaderWidth();
    const HeaderDom = visible ? (
      <Header
        style={{ padding: 0 }}
        className={fixedHeader ? "style.fixedHeader" : ""}
      >
        <GlobalHeader onCollapse={handleMenuCollapse} {...this.props} />
      </Header>
    ) : null;
    return <div>{HeaderDom}</div>;
  }
}

export default HeaderView;
