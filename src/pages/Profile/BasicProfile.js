import React, { PureComponent } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import DescriptionList from "@/components/DescriptionList";
import { connect } from "dva";
import { Card, Divider, Table } from "antd";

const { Description } = DescriptionList;

import styles from "./BasicProfile.less";

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects["profile/fetchBasic"]
}))
class BasicProfile extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "profile/fetchBasic"
    });
  }

  render() {
    return (
      <PageHeaderWrapper title="基础详情页">
        <Card bordered={false}>
          <DescriptionList
            size="large"
            title="退款申请"
            style={{ marginBottom: 32 }}
          >
            <Description term="取货单号">1000000000</Description>
            <Description term="状态">已取货</Description>
            <Description term="销售单号">1234123421</Description>
            <Description term="子订单">3214321432</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList
            size="large"
            title="用户信息"
            style={{ marginBottom: 32 }}
          >
            <Description term="用户姓名">付小小</Description>
            <Description term="联系电话">18100000000</Description>
            <Description term="常用快递">菜鸟仓储</Description>
            <Description term="取货地址">
              浙江省杭州市西湖区万塘路18号
            </Description>
            <Description term="备注">无</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
