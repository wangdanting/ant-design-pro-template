import React, { Fragment } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import { formatMessage, FormattedMessage } from "umi/locale";

class BasicForm extends React.PureComponent {
  render() {
    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.basic.title" />}
        content={<FormattedMessage id="app.forms.basic.description" />}
      />
    );
  }
}

export default BasicForm;
