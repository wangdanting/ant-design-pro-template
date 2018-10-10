import React, { Component, Fragment } from 'react';
import LoginContext from './LoginContext';
import classNames from 'classnames';
import { Form, Tabs, Button } from 'antd';
import LoginTab from './LoginTab';
import styles from './index.less';


// const WrapContext1 = props => (
//   <LoginContext.Consumer>
//     {theme => console.log(theme, 'theme')}
//   </LoginContext.Consumer>
// );
// const ThemedButton = props => (
//   <LoginContext.Consumer>
//     {theme => console.log(theme, 'theme')}
//   </LoginContext.Consumer>
// );

function ThemedButton(props) {
  // ThemedButton 组件从 context 接收 theme
  return (
    <LoginContext.Consumer>
      {theme => console.log(theme, 'theme')}
    </LoginContext.Consumer>
  );
}

中间组件
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
class Login extends Component {

  render() {
    return (
      
      <div>abc</div>
    )
  }
}

Login.Tab = LoginTab;

export default Form.create()(Login);