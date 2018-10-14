import React, { Component } from 'react';
import styles from './Register.less';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class Register extends Component {
  state = {
    help: ''
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'validation.password.required' }),
        visible: !!value
      });
      callback('error');
    } else {
      this.setState({
        help: ''
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
    
    }
  }

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="app.register.register" />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('mail', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.email.required' }),
                },
                {
                  type: 'email',
                  message: formatMessage({ id: 'validation.email.wrong-format' }),
                }
              ],
            })(
              <Input size="large" placeholder={formatMessage({ id: 'form.email.placeholder' })} />
            )}
          </FormItem>
          <FormItem help={help}>
            {getFieldDecorator('password', {
              rules: [
                {
                  validator: this.checkPassword,
                }
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({ id: 'form.password.placeholder' })}
              />
            )}
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Register);