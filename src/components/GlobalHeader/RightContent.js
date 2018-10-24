import React, { PureComponent } from "react";
import styles from "./index.less";
import HeaderSearch from "../HeaderSearch";
import classNames from "classnames";
import { formatMessage } from "umi/locale";
import { Tooltip, Icon, Tag } from "antd";
import NoticeIcon from "../NoticeIcon";
import groupBy from "lodash/groupBy";
import moment from "moment";

class GlobalHeaderRight extends PureComponent {
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }

    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          tode: "",
          processing: "blue",
          urgent: "red",
          doing: "gold"
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, "type");
  }

  render() {
    const { theme, currentUser, onNoticeVisibleChange, fetchingNotices } = this.props;
    let className = styles.right;
    if (theme === "dark") {
      className = `${styles.right}  ${styles.dark}`;
    }
    const noticeData = this.getNoticeData();
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
        <Tooltip title={formatMessage({ id: "component.globalHeader.help" })}>
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
        <NoticeIcon
          className={styles.action}
          count={currentUser.notifyCount}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
          locale={{
            emptyText: formatMessage({ id: 'component.noticeIcon.empty' }),
            clear: formatMessage({ id: 'component.noticeIcon.clear' }),
          }}
          onItemClick={(item, tabProps) => {
            console.log(item, tabProps); // eslint-disable-line
          }}
        >
          <NoticeIcon.Tab
            list={noticeData.notification}
            title={formatMessage({ id: "component.globalHeader.notification" })}
            name="notification"
            emptyText={formatMessage({
              id: "component.globalHeader.notification.empty"
            })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          />
          <NoticeIcon.Tab
            list={noticeData.message}
            title={formatMessage({ id: "component.globalHeader.message" })}
            name="message"
            emptyText={formatMessage({
              id: "component.globalHeader.message.empty"
            })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          />
          <NoticeIcon.Tab
            list={noticeData.event}
            title={formatMessage({ id: "component.globalHeader.event" })}
            name="event"
            emptyText={formatMessage({
              id: "component.globalHeader.event.empty"
            })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
          />
        </NoticeIcon>
      </div>
    );
  }
}

export default GlobalHeaderRight;
