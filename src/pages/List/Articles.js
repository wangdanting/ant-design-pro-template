import React, { PureComponent, Fragment } from "react";
import StandardFormRow from "@/components/StandardFormRow";
import styles from "./Articles.less";
import { Card, Form } from "antd";

const FormItem = Form.Item;

@Form.create()
class Articles extends PureComponent {
  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Fragment>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow
              title="所属类目"
              block
              style={{ paddingBottom: 11 }}
            >
              <FormItem />
            </StandardFormRow>
          </Form>
        </Card>
      </Fragment>
    );
  }
}

export default Articles;
