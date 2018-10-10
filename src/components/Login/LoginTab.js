import React from "react";
import LoginContext from './LoginContext';

export default class LoginTab extends React.PureComponent {
  render() {
    return (
      <LoginContext.Consumer>
        {name => {
          console.log(name, 'name3')
        }}
      </LoginContext.Consumer>
    );
  }
}