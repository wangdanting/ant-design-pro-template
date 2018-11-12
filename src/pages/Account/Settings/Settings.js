import React, { PureComponent } from "react";
import GridContent from "@/components/PageHeaderWrapper/GridContent";
import { FormattedMessage } from "umi/locale";
import { Menu } from "antd";
import router from "umi/router";
import { connect } from "dva";

import styles from "./Settings.less";

const menuMap = {
  base: (
    <FormattedMessage
      id="app.settings.menuMap.basic"
      defaultMessage="Basic Settings"
    />
  ),
  security: (
    <FormattedMessage
      id="app.settings.menuMap.security"
      defaultMessage="Security Settings"
    />
  ),
  binding: (
    <FormattedMessage
      id="app.settings.menuMap.binding"
      defaultMessage="Account Binding"
    />
  ),
  notification: (
    <FormattedMessage
      id="app.settings.menuMap.notification"
      defaultMessage="New Message Notification"
    />
  )
};

@connect(({ user }) => ({
  currentUser: user.currentUser
}))
class Settings extends PureComponent {
  constructor(props) {
    super(props);
    const { match, location } = props;
    const key = location.pathname.replace(`${match.path}`, "");
    this.state = {
      mode: "inline",
      selectKey: menuMap[key] ? key : "base"
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { match, location } = nextProps;
    let selectKey = location.pathname.replace(`${match.path}/`, "");
    selectKey = menuMap[selectKey] ? selectKey : "base";
    if (selectKey !== prevState.selectKey) {
      return { selectKey };
    }
    return null;
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      let mode = "inline";
      const { offsetWidth } = this.main;
      if (offsetWidth < 641 && offsetWidth > 400) {
        mode = "horizontal";
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = "horizontal";
      }
      this.setState({
        mode
      });
    });
  };

  getmenu = () => {
    return Object.keys(menuMap).map(item => (
      <Menu.Item key={item}>{menuMap[item]}</Menu.Item>
    ));
  };

  selectKey = ({ key }) => {
    router.push(`/account/settings/${key}`);
    this.setState({
      selectKey: key
    });
  };

  getRightTitle = () => {
    const { selectKey } = this.state;
    return menuMap[selectKey];
  };

  render() {
    const { children, currentUser } = this.props;
    if (!currentUser.userid) {
      return "";
    }

    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={ref => {
            this.main = ref;
          }}
        >
          <div className={styles.leftmenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={this.selectKey}
            >
              {this.getmenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {children}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default Settings;
