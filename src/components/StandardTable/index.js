import React, { PureComponent, Fragment } from "react";
import styles from "./index.less";
import { Table, Alert } from "antd";

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce(
        (sum, val) => parseFloat(val[item.dataIndex], 10),
        0
      )
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }
    this.setState({ selectedRowKeys, needTotalList });
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  handleTableChange = (pagination, filters, sorter) => {
    console.log("ppp");
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const {
      rowKey,
      data: { list, pagination },
      ...rest
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <Fragment>
                已选择{" "}
                <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>
                项&nbsp;&nbsp;
                {needTotalList.map(item => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))}
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  清空
                </a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          rowKey={rowKey || "key"}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          // onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;