import React, { PureComponent } from 'react';
import numeral from 'numeral';

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

class Yuan extends PureComponent {
  componentDidMount() {
    this.rendertoHtml();
  }

  componentDidUpdate() {
    this.rendertoHtml();
  }

  rendertoHtml = () => {
    const { children } = this.props;
    if (this.main) {
      this.main.innerHTML = yuan(children);
    }
  };

  render() {
    return <span ref={ref => (this.main = ref)} />;
  }
}

export default Yuan;
