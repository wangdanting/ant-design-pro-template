import React, { PureComponent } from "react";
import { Layout, message } from "antd";
import { connect } from "dva";
import styles from "./Header.less";
import GlobalHeader from "@/components/GlobalHeader";
import { formatMessage } from 'umi/locale';

const { Header } = Layout;

@connect(({ setting, global, user, loading }) => ({
  currentUser: user.currentUser,
  setting,
  collapsed: global.collapsed,
  notices: global.notices,
  fetchingNotices: loading.effects["global/fetchNotices"]
}))
class HeaderView extends PureComponent {
  state = {
    visible: true
  };

  // getHeaderWidth = () => {
  //   const { collapsed } = this.props;
  //   return collapsed ? "calc(100% - 80px)" : "calc(100% - 256px)";
  // };

  handleNoticeVisibleChange = visible => {
    if (visible) {
      const { dispatch } = this.props;
      dispatch({
        type: "global/fetchNotices"
      });
    }
  };

  handleNoticeClear = type => {
    message.success(`${formatMessage({ id: 'component.noticeIcon.cleared' })} ${formatMessage({ id: `component.globalHeader.${type}` })}`);
    const { dispatch } = this.props;
    dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'userCenter') {
      router.push('/account/center');
      return;
    }
    if (key === 'triggerError') {
      router.push('/exception/trigger');
      return;
    }
    if (key === 'userinfo') {
      router.push('/account/settings/base');
      return;
    }
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
      });
    }
  };

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
        <GlobalHeader
          onCollapse={handleMenuCollapse}
          onNoticeVisibleChange={this.handleNoticeVisibleChange}
          onNoticeClear={this.handleNoticeClear}
          onMenuClick={this.handleMenuClick}
          {...this.props}
        />
      </Header>
    ) : null;
    return <div>{HeaderDom}</div>;
  }
}

export default HeaderView;
