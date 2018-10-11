import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './Login.less';
import Login from '@/components/Login';

const { Tab, UserName, Password, Mobile, Captcha } = Login;

class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  handleSubmit = () => {

  };

  onGetCaptcha = () => {

  };

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

