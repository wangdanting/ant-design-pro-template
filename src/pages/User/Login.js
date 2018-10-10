import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './Login.less';
import Login from '@/components/Login';

const { Tab } = Login;

class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
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
          </Tab>
        </Login>
      </div>
    )
  }
}

export default LoginPage;

