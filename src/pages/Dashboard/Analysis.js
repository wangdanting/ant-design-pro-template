import React, { PureComponent } from "react";
import { Row, Col, Tooltip, Icon } from "antd";
import { connect } from "dva";
import numeral from "numeral";
import { formatMessage, FormattedMessage } from "umi/locale";
import GridContent from "@/components/PageHeaderWrapper/GridContent";
import { ChartCard, Field } from "@/components/Charts";
import Trend from "@/components/Trend";
import Yuan from "@/utils/Yuan";

import styles from "./Analysis.less";

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 }
};

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects["chart/fetch"]
}))
class Analysis extends PureComponent {
  state = {
    loading: true
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: "chart/fetch"
      });
      this.timeoutId = setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 600);
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: "chart/clear"
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const { loading: stateLoading } = this.state;
    const { loading: propsLoading } = this.props;
    const loading = propsLoading || stateLoading;
    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title={
                <FormattedMessage
                  id="app.analysis.total-sales"
                  defaultMessage="Total Sales"
                />
              }
              action={
                <Tooltip
                  title={
                    <FormattedMessage
                      id="app.analysis.introduce"
                      defaultMessage="introduce"
                    />
                  }
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              loading={loading}
              total={() => <Yuan>126560</Yuan>}
              footer={
                <Field
                  label={
                    <FormattedMessage
                      id="app.analysis.day-sales"
                      defaultMessage="Day Sales"
                    />
                  }
                  value={`￥${numeral(12423).format("0,0")}`}
                />
              }
              contentheight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                <FormattedMessage
                  id="app.analysis.week"
                  defaultMessage="Weekly Changes"
                />
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                <FormattedMessage
                  id="app.analysis.day"
                  defaultMessage="Daily Changes"
                />
                <span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Analysis;
