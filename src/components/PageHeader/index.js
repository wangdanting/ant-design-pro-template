import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Skeleton, Tabs } from 'antd';
import BreadcrumbView from './breadcrumb';
import styles from './index.less';

const { TabPane } = Tabs;

class PageHeader extends PureComponent {
  onChange = key => {
    const { onTabChange } = this.props;
    if (onTabChange) {
      onTabChange(key);
    }
  };
  render() {
    const {
      className,
      wide,
      loading = false,
      hiddenBreadcrumb = false,
      logo,
      title,
      action,
      content,
      extraContent,
      tabList,
      tabActiveKey,
      tabDefaultActiveKey,
      tabBarExtraContent
    } = this.props;
    const clsString = classNames(styles.pageHeader, className);
    const activeKeyProps = {};
    if (tabDefaultActiveKey !== undefined) {
      activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
    }
    if (tabActiveKey !== undefined) {
      activeKeyProps.activeKey = tabActiveKey;
    }
    return (
      <div className={clsString}>
        <div className={wide ? styles.wide : ''}>
          <Skeleton
            loading={loading}
            title={false}
            active
            paragraph={{ rows: 3 }}
            avatar={{ size: 'large', shape: 'circle' }}
          >
            {hiddenBreadcrumb ? null : <BreadcrumbView {...this.props} />}
            <div className={styles.detail}>
              {logo && <div className={styles.logo}>{logo}</div>}
              <div className={styles.main}>
                <div className={styles.row}>
                  {title && <h1 className={styles.title}>{title}</h1>}
                  {action && <div className={styles.action}>{action}</div>}
                </div>
                <div className={styles.row}>
                  {content && <div className={styles.content}>{content}</div>}
                  {extraContent && (
                    <div className={styles.extraContent}>{extraContent}</div>
                  )}
                </div>
              </div>
            </div>
            {tabList && tabList.length ? (
              <Tabs
                className={styles.tabs}
                {...activeKeyProps}
                onChange={this.onChange}
                tabBarExtraContent={tabBarExtraContent}
              >
                {tabList.map(item => (
                  <TabPane tab={item.tab} key={item.key} />
                ))}
              </Tabs>
            ) : null}
          </Skeleton>
        </div>
      </div>
    );
  }
}

export default PageHeader;
