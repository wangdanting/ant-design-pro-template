import React, { Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Button, Icon } from 'antd';
import Result from '@/components/Result';

const actions = (
  <Button type="primary">
    <FormattedMessage
      id="app.result.error.btn-text"
      defaultMessage="Return to modify"
    />
  </Button>
);

const extra = (
  <Fragment>
    <div
      style={{
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: '500',
        marginBottom: 16
      }}
    >
      <FormattedMessage
        id="app.result.error.hint-title"
        defaultMessage="The content you submitted has the following error:"
      />
    </div>
    <div style={{ marginBottom: 16 }}>
      <Icon
        style={{ color: '#f5222d', marginRight: 8 }}
        type="close-circle-o"
      />
      <FormattedMessage
        id="app.result.error.hint-text1"
        defaultMessage="Your account has been frozen"
      />
      <a href="http://" style={{ marginLeft: 16 }}>
        <FormattedMessage
          id="app.result.error.hint-btn1"
          defaultMessage="Thaw immediately"
        />
        <Icon type="right" />
      </a>
    </div>
    <div>
      <Icon
        style={{ color: '#f5222d', marginRight: 8 }}
        type="close-circle-o"
      />
      <FormattedMessage
        id="app.result.error.hint-text2"
        defaultMessage="Your account is not yet eligible to apply"
      />
      <a href="http://" style={{ marginLeft: 16 }}>
        <FormattedMessage
          id="app.result.error.hint-btn2"
          defaultMessage="Upgrade immediately"
        />
        <Icon type="right" />
      </a>
    </div>
  </Fragment>
);

const Error = () => (
  <PageHeaderWrapper>
    <Card bordered={false}>
      <Result
        type="error"
        title={formatMessage({ id: 'app.result.error.title' })}
        description={formatMessage({ id: 'app.result.error.description' })}
        actions={actions}
        extra={extra}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </PageHeaderWrapper>
);

export default Error;
