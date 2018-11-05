import React, { PureComponent, Fragment } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  Icon,
  DatePicker,
  InputNumber,
  Modal,
  Badge,
  Divider
} from "antd";
import styles from "./TableList.less";
import { connect } from "dva";
import StandardTable from "@/components/StandardTable";
import moment from "moment";

const FormItem = Form.Item;
const { Option } = Select;

const statusMap = ["default", "processing", "success", "error"];
const status = ["关闭", "运行中", "已上线", "异常"];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator("desc", {
          rules: [
            {
              required: true,
              message: "请输入至少五个字符的规则描述！",
              min: 5
            }
          ]
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ rule }) => ({
  rule
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    expandForm: false, //是否是展开状态
    modalVisible: false,
    selectedRows: []
  };

  columns = [
    {
      title: "规则名称",
      dataIndex: "name"
    },
    {
      title: "描述",
      dataIndex: "desc"
    },
    {
      title: "服务调用次数",
      dataIndex: "callNo",
      sorter: true,
      align: "right",
      render: val => `${val} 万`,
      // mark to display a total number
      needTotal: true
    },
    {
      title: "状态",
      dataIndex: "status",
      filters: [
        {
          text: status[0],
          value: 0
        },
        {
          text: status[1],
          value: 1
        },
        {
          text: status[2],
          value: 2
        },
        {
          text: status[3],
          value: 3
        }
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      }
    },
    {
      title: "上次调度时间",
      dataIndex: "updatedAt",
      sorter: true,
      render: val => <span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>
    },
    {
      title: "操作",
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>
            配置
          </a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </Fragment>
      )
    }
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "rule/fetch"
    });
  }

  handleSearch() {}

  handleModalVisible = ({ isShow = false } = {}) => {
    this.setState({
      modalVisible: !!isShow
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: "rule/add",
      payload: {
        desc: fields.desc
      }
    });
    message.success("添加成功");
    this.handleModalVisible({ isShow: false });
  };

  toggleForm = () => {
    this.setState(prevState => ({
      expandForm: !prevState.expandForm
    }));
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {}
    });
    dispatch({
      type: "rule/fetch",
      payload: {}
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator("name")(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator("status")(
                <Select placeholder="请选择" style={{ width: "100%" }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator("name")(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator("status")(
                <Select placeholder="请选择" style={{ width: "100%" }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator("number")(
                <InputNumber style={{ width: "100%" }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator("date")(
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="请输入更新日期"
                />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator("status3")(
                <Select placeholder="请选择" style={{ width: "100%" }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator("status4")(
                <Select placeholder="请选择" style={{ width: "100%" }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: "hidden" }}>
          <div style={{ float: "right", marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows
    });
  };

  render() {
    const { modalVisible, selectedRows } = this.state;
    const {
      rule: { data }
    } = this.props;
    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleModalVisible({ isShow: true })}
              >
                新建
              </Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              columns={this.columns}
              data={data}
              onSelectRow={this.handleSelectRows}
            />
          </div>
        </Card>
        <CreateForm
          handleAdd={this.handleAdd}
          handleModalVisible={this.handleModalVisible}
          modalVisible={modalVisible}
        />
      </PageHeaderWrapper>
    );
  }
}
export default TableList;
