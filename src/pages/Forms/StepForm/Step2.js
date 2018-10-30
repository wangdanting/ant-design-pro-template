import React, { PureComponent } from "react";
import { Form, Input, Button, Alert, Divider } from "antd";
import styles from "./style.less";

@Form.create()
class Step2 extends PureComponent {
  render() {
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="确认转账后，资金将直接打入对方账户，无法退回。"
          style={{ marginBottom: 24 }}
        />
      </Form>
    );
  }
}

export default Step2;
