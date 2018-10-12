import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import styles from './Login.less';
import Login from '@/components/Login';

const { Tab, UserName, Password, Mobile, Captcha } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login']
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  handleSubmit = (err, values) => {
    console.log('xxxx');
    console.log(values, 'values');
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }

  };

  onGetCaptcha = () => (
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        console.log(values, 'values1');
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
        }
      })
    })
  );

  onTabChange = (type) => {
    this.setState({
      type
    });
  };

  render() {
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}>
          <div>abc</div>
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            <UserName name="userName" placeholder="admin/user" />
            <Password
              name="password"
              placeholder="888888/123456"
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          <Tab key="mobile" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>
            <Mobile name="mobile" />
            <Captcha name="captcha" countDown={120} onGetCaptcha={this.onGetCaptcha} />
          </Tab>
        </Login>
      </div>
    )
  }
}

export default LoginPage;

