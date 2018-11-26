import React, { Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Result from '@/components/Result';
import DescriptionList from '@/components/DescriptionList';
import { Card, Button, Steps, Icon } from 'antd';

const { Description } = DescriptionList;
const { Step } = Steps;

const actions = (
  <Fragment>
    <Button type="primary">
      <FormattedMessage id="app.result.success.btn-return" defaultMessage="Back to list" />
    </Button>
    <Button>
      <FormattedMessage id="app.result.success.btn-project" defaultMessage="View project" />
    </Button>
    <Button>
      <FormattedMessage id="app.result.success.btn-print" defaultMessage="Print" />
    </Button>
  </Fragment>
);

const List = (
  <DescriptionList size="small" col="3">
    <Description term={formatMessage({ id: 'app.result.success.operate-id' })}>23421</Description>
    <Description term={formatMessage({ id: 'app.result.success.principal' })}>
      <FormattedMessage id="app.result.success.step1-operator" defaultMessage="Qu Lili" />
    </Description>
    <Description term={formatMessage({ id: 'app.result.success.operate-time' })}>
      2016-12-12 ~ 2017-12-12
    </Description>
  </DescriptionList>
);

const desc1 = (
  <div
    style={{
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
      position: 'relative',
      left: 42,
      textAlign: 'left',
    }}
  >
    <div style={{ margin: '8px 0 4px' }}>
      <FormattedMessage id="app.result.success.step1-operator" defaultMessage="Qu Lili" />
      <Icon style={{ marginLeft: 8 }} type="dingding-o" />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div style={{ fontSize: 12, position: 'relative', left: 42, textAlign: 'left' }}>
    <div style={{ margin: '8px 0 4px' }}>
      <FormattedMessage id="app.result.success.step2-operator" defaultMessage="Zhou Maomao" />
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </div>
    <div>
      <a href="http://">
        <FormattedMessage id="app.result.success.step2-extra" defaultMessage="Urge" />
      </a>
    </div>
  </div>
);

const StepWrapper = (
  <Steps style={{ marginLeft: -42, width: 'calc(100% + 84px)' }} progressDot current={1}>
    <Step
      title={
        <span style={{ fontSize: 14 }}>
          <FormattedMessage id="app.result.success.step1-title" defaultMessage="Create project" />
        </span>
      }
      description={desc1}
    />
    <Step
      title={
        <span style={{ fontSize: 14 }}>
          <FormattedMessage
            id="app.result.success.step2-title"
            defaultMessage="Departmental preliminary review"
          />
        </span>
      }
      description={desc2}
    />
    <Step
      title={
        <span style={{ fontSize: 14 }}>
          <FormattedMessage id="app.result.success.step3-title" defaultMessage="Financial review" />
        </span>
      }
    />
    <Step
      title={
        <span style={{ fontSize: 14 }}>
          <FormattedMessage id="app.result.success.step4-title" defaultMessage="Finish" />
        </span>
      }
    />
  </Steps>
);

const extra = (
  <Fragment>
    <div
      style={{
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: '500',
        marginBottom: 20,
      }}
    >
      <FormattedMessage id="app.result.success.operate-title" defaultMessage="Project Name" />
      {List}
      {StepWrapper}
    </div>
  </Fragment>
);

const Success = () => (
  <PageHeaderWrapper>
    <Card bordered={false}>
      <Result
        type="success"
        title={formatMessage({ id: 'app.result.success.title' })}
        description={formatMessage({
          id: 'app.result.success.description',
        })}
        actions={actions}
        extra={extra}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  </PageHeaderWrapper>
);

export default Success;
