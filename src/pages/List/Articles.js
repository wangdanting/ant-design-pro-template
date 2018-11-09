import React, { PureComponent, Fragment } from "react";
import StandardFormRow from "@/components/StandardFormRow";
import TagSelect from "@/components/TagSelect";
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
              <FormItem>
                {getFieldDecorator("category")(
                  <TagSelect expandable>
                    <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                    <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                    <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                    <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                    <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                    <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                    <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                    <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                    <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                    <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                    <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                    <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
          </Form>
        </Card>
      </Fragment>
    );
  }
}

export default Articles;
