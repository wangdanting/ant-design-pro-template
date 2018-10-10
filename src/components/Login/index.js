import React, { Component, Fragment } from 'react';
import LoginContext from './LoginContext';
import classNames from 'classnames';
import styles from './index.less';
import LoginTab from './LoginTab';

export default class Login extends Component {

  render() {
    return (
      <LoginContext.Provider value={123}>
        <LoginTab />
      </LoginContext.Provider>
    )
  }
}