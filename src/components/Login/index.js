import React, { Component, Fragment } from 'react';
import LoginContext from './LoginContext';
import classNames from 'classnames';
import styles from './index.less';
import LoginTab from './LoginTab';
import { Form, Tabs } from 'antd';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.defaultActiveKey,
      tabs: [],
      active: {},
    };
  }

  getContext = () => {
    const { tabs } = this.state;
    const { form } = this.props;
    return {
      tabUtil: {
        addTab: id => {
          this.setState({
            tabs: [...tabs, id],
          });
        },
        removeTab: id => {
          this.setState({
            tabs: tabs.filter(currentId => currentId !== id),
          });
        },
      },
      form,
      updateActive: activeItem => {
        const { type, active } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active,
        });
      },
    };
  };

  render() {
    const { className, children } = this.props;
    const { type, tabs } = this.state;
    const TabChildren = [];
    const otherChildren = [];
    React.Children.forEach(children, item => {
      if (!item) {
        return;
      }
      // eslint-disable-next-line
      if (item.type.typeName === 'LoginTab') {
        TabChildren.push(item);
      } else {
        otherChildren.push(item);
      }
    });

    console.log(tabs, 'tabs');

    return (
      <LoginContext.Provider value={this.getContext()}>
        <div className={classNames(className, styles.login)}>
          <Form onSubmit={this.handleSubmit}>
            {tabs.length ? (
              <Fragment>
                <Tabs
                  animated={false}
                  className={styles.tabs}
                  activeKey={type}
                  onChange={this.onSwitch}
                >
                  {TabChildren}
                </Tabs>
                {otherChildren}
              </Fragment>
            ) : (
              [...children]
              )}
          </Form>
        </div>
      </LoginContext.Provider>
    )
  }
}

Login.Tab = LoginTab;
export default Form.create()(Login);