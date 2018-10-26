import React, { Fragment } from "react";
import PageHeader from "@/components/PageHeader";
import MenuContext from "@/layouts/MenuContext";
import { connect } from "dva";
import { FormattedMessage } from "umi/locale";

const PageHeaderWrapper = ({ contentWidth, ...restProps }) => (
  <div>
    <MenuContext.Consumer>
      {value => (
        <PageHeader
          wide={contentWidth === "Fixed"}
          {...value}
          itemRender={item => {
            if (item.locale) {
              return (
                <FormattedMessage id={item.locale} defaultMessage={item.name} />
              );
            }
            return item.name;
          }}
          {...restProps}
        />
      )}
    </MenuContext.Consumer>
  </div>
);

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth
}))(PageHeaderWrapper);
