import React, { PureComponent, Fragment } from "react";
import { Form, Input, Button, Select, Divider } from "antd";
import styles from "./style.less";
import { connect } from "dva";
import router from "umi/router";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};

@connect(({ form }) => ({
  data: form.step
}))
@Form.create()
class Step1 extends PureComponent {
  onValidateForm = () => {
    const {
      form: { validateFields },
      dispatch
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: "form/saveStepFormData",
          payload: values
        });
        router.push("/form/step-form/confirm");
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      data
    } = this.props;
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="付款账户">
            {getFieldDecorator("payAccount", {
              initialValue: data.payAccount,
              rules: [{ required: true, message: "请选择付款账户" }]
            })(
              <Select placeholder="test@example.com">
                <Option value="ant-design@alipay.com">
                  ant-design@alipay.com
                </Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="收款账户">
            <Input.Group compact>
              <Select defaultValue="alipay" style={{ width: 100 }}>
                <Option value="alipay">支付宝</Option>
                <Option value="bank">银行账户</Option>
              </Select>
              {getFieldDecorator("receiverAccount", {
                initialValue: data.receiverAccount,
                rules: [
                  { required: true, message: "请输入收款人账户" },
                  { type: "email", message: "账户名应为邮箱格式" }
                ]
              })(
                <Input
                  style={{ width: "calc(100% - 100px)" }}
                  placeholder="test@example.com"
                />
              )}
            </Input.Group>
          </Form.Item>
          <Form.Item {...formItemLayout} label="收款人姓名">
            {getFieldDecorator("receiverName", {
              initialValue: data.receiverName,
              rules: [{ required: true, message: "请输入收款人姓名" }]
            })(<Input placeholder="请输入收款人姓名" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="转账金额">
            {getFieldDecorator("amount", {
              initialValue: data.amount,
              rules: [
                { required: true, message: "请输入转账金额" },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: "请输入合法金额数字"
                }
              ]
            })(<Input prefix="￥" placeholder="请输入金额" />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span
              }
            }}
            label=""
          >
            <Button type="primary" onClick={this.onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

export default Step1;
