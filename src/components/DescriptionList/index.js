import React, { PureComponent } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import styles from "./index.less";
import responsive from "./responsive";

const Description = ({ term, column, children, ...restProps }) => (
  <Col {...responsive[column]} {...restProps}>
    {term && <div className={styles.term}>{term}</div>}
    {children !== null &&
      children !== undefined && <div className={styles.detail}>{children}</div>}
  </Col>
);

Description.defaultProps = {
  term: ""
};

Description.propTypes = {
  term: PropTypes.node
};

const DescriptionList = ({
  className,
  title,
  col = 3,
  layout = "horizontal",
  gutter = 32,
  children,
  size,
  ...restProps
}) => {
  const clsString = classNames(
    styles.descriptionList,
    styles[layout],
    className,
    {
      [styles.small]: size === "small",
      [styles.large]: size === "large"
    }
  );
  const column = col > 4 ? 4 : col;
  return (
    <div className={clsString} {...restProps}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <Row gutter={gutter}>
        {React.Children.map(
          children,
          child => (child ? React.cloneElement(child, { column }) : child)
        )}
      </Row>
    </div>
  );
};

DescriptionList.Description = Description;

export default DescriptionList;
