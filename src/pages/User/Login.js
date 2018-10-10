import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import styles from './Login.less';
import Login from '@/components/Login';

// const { Tab } = Login;

class LoginPage extends Component {

  render() {

    return (
      <div className={styles.main}>
        <Login/>
      </div>
    )
  }
}

export default LoginPage;

