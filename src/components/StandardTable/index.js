import React, { PureComponent, Fragment } from "react";
import styles from "./index.less";
import { Table } from "antd";

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
        <Table
          rowKey={rowKey || "key"}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;
