import React, { PureComponent } from "react";
import classNames from "classnames";

class HeaderSearch extends PureComponent {
  render() {
    const {className} = this.props;
    return (
      <span className={classNames(className)}>dd</span>
    );
  }
}

export default HeaderSearch;
