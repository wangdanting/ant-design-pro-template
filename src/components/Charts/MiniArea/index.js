import React, { PureComponent } from 'react';
import { Chart } from 'bizcharts';
import styles from '../index.less';

class MiniArea extends PureComponent {
  render() {
    const { height, animate = true } = this.props;
    return (
      <div className={styles.miniChart} style={{ height }}>
        <div className={styles.chartContent}>{height > 0 && <Chart animate={animate} />}</div>
      </div>
    );
  }
}
export default MiniArea;
