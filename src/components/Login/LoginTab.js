import React, { Component } from 'react';
import { Tabs } from 'antd';
import LoginContext from './loginContext';


const wrapContext = props => (
  <LoginContext.Consumer>
    {value => console.log(value, 'value')}
  </LoginContext.Consumer>
);

export default ThemedButton;
