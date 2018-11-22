import React, { PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Steps } from 'antd';
import styles from '../style.less';

const { Step } = Steps;

class StepForm extends PureComponent {
  getCurrentStep() {
    const {
      location: { pathname }
    } = this.props;

    const pathList = pathname.split('/');
    switch (pathList.pop()) {
    case 'info':
      return 0;
    case 'confirm':
      return 1;
    case 'result':
      return 2;
    default:
      return 0;
    }
  }

  render() {
    const { location, children } = this.props;
    return (
      <PageHeaderWrapper
        title="分步表单"
        tabActiveKey={location.pathname}
        content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>
            {children}
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default StepForm;
