import React, { PureComponent } from "react";
import styles from "./index.less";
import { Popover, Badge, Icon, Tabs, Spin } from "antd";
import classNames from "classnames";
import List from "./NoticeList";

const { TabPane } = Tabs;

class NoticeIcon extends PureComponent {
  static Tab = TabPane;

  static defaultProps = {
    onTabChange: () => {},
    onItemClick: () => {},
    onClear: () => {}
  };

  onTabChange = tabType => {
    const { onTabChange } = this.props;
    onTabChange(tabType);
  };

  onItemClick = (item, tabProps) => {
    const { onItemClick } = this.props;
    onItemClick(item, tabProps);
  };

  getNotificationBox() {
    const { children, loading, locale, onClear } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, child => {
      console.log(child, "child");
      const title =
        child.props.list && child.props.list.length > 0
          ? `${child.props.title} (${child.props.list.length})`
          : child.props.title;

      return (
        <TabPane tab={title} key={child.props.name}>
          <List
            {...child.props}
            data={child.props.list}
            title={child.props.title}
            locale={locale}
            onClick={item => this.onItemClick(item, child.props)}
            onClear={() => onClear(child.props.name)}
          />
        </TabPane>
      );
    });
    return (
      <Spin spinning={loading} delay={0}>
        <Tabs className={styles.tabs} onChange={this.onTabChange}>
          {panes}
        </Tabs>
      </Spin>
    );
  }

  render() {
    const {
      className,
      count,
      bell,
      onPopupVisibleChange,
      popupAlign
    } = this.props;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const NoticeBellIcon = bell || <Icon type="bell" className={styles.icon} />;
    const notificationBox = this.getNotificationBox();
    const trigger = (
      <span className={noticeButtonClass}>
        <Badge
          count={count}
          style={{ boxShadow: "none" }}
          className={styles.badge}
        >
          {NoticeBellIcon}
        </Badge>
      </span>
    );
    // if (!notificationBox) {
    //   return trigger;
    // }
    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        onVisibleChange={onPopupVisibleChange}
        trigger="click"
        popupAlign={popupAlign}
      >
        {trigger}
      </Popover>
    );
  }
}

export default NoticeIcon;
