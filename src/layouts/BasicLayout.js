import React, { Fragment } from "react";
import DocumentTitle from "react-document-title";

class BasicLayout extends React.PureComponent {
  render() {
    const {
      location: { pathname }
    } = this.props;
    return <Fragment />;
  }
}

export default BasicLayout;
