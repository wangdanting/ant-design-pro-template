import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import ItemMap from './map';
import LoginContext form './LoginContext';
import omit from 'omit.js';

const FormItem = Form.Item;
class WrapFormItem extends Component {
  static defaultProps = {
    buttonText: '获取验证码',
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  getFormItemOptions = ({ rules, defaultValue, customprops }) => {
    const options = {
      rules: rules || customprops.rules,
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  onGetCaptcha = () => {
    
  }



  render() {
    const { count } = this.state;

    const {
      form: { getFieldDecorator },
    } = this.props;

    const {
      name,
      customprops,
      type,
      ...restProps
    } = this.props;

    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);
    const otherProps = restProps || {};

    if (type === 'Captcha') {
      const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator(name, options)(<Input {...customprops} {...inputProps} />)}
            </Col>
            <Col span={8}>
              <Button
                disabled={count}
                className={styles.getCaptcha}
                size="large"
                onClick={this.onGetCaptcha}
              >
                {count ? `${count} s` : buttonText}
              </Button>
            </Col>
          </Row>
        </FormItem>
      )
    }

    return (
      <FormItem>
        {getFieldDecorator(name, options)(
          <Input {...customprops} {...otherProps} />
        )}
      </FormItem>
    )
  }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = props => (
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customprops={item.props}
          rules={item.rules}
          {...props}
          type={key}
          updateActive={context.updateActive}
          form={context.form}
        />
      )}
    </LoginContext.Consumer>
  )
});

export default LoginItem;
