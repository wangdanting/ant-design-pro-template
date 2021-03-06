import React from 'react';
import PageHeader from '@/components/PageHeader';
import MenuContext from '@/layouts/MenuContext';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import styles from './index.less';
import GridContent from './GridContent';

const PageHeaderWrapper = ({ children, contentWidth, ...restProps }) => (
  <div>
    <MenuContext.Consumer>
      {value => (
        <PageHeader
          wide={contentWidth === 'Fixed'}
          {...value}
          itemRender={item => {
            if (item.locale) {
              return <FormattedMessage id={item.locale} defaultMessage={item.name} />;
            }
            return item.name;
          }}
          {...restProps}
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
}))(PageHeaderWrapper);
