import React, { PureComponent } from "react";
import styles from "./index.less";
import classNames from "classnames";
import { Tag, Icon } from "antd";

const CheckableTag = Tag.CheckableTag;

const TagSelectOption = ({ children, checked, onChange, value }) => (
  <CheckableTag
    checked={checked}
    key={value}
    onChange={checked => onChange(value, checked)}
  >
    {children}
  </CheckableTag>
);

TagSelectOption.isTagSelectOption = true;

class TagSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      value: props.value || props.defaultValue || []
    };
  }

  isTagSelectOption = node =>
    node &&
    node.type &&
    (node.type.isTagSelectOption ||
      node.type.displayName === "TagSelectOption");

  getAllTags() {
    let { children } = this.props;
    children = React.Children.toArray(children);
    const checkTags = children
      .filter(child => this.isTagSelectOption(child))
      .map(child => child.props.value);
    return checkTags || [];
  }

  onChange = value => {
    const { onChange } = this.props;
    this.setState({ value });
    if (onChange) {
      onChange(value);
    }
  };

  onSelectAll = checked => {
    let checkedTags = [];
    if (checked) {
      checkedTags = this.getAllTags();
    }
    this.onChange(checkedTags);
  };

  handleTagChange = (value, checked) => {
    const { value: StateValue } = this.state;
    const checkedTags = [...StateValue];
    const index = checkedTags.indexOf(value);

    if (checked && index === -1) {
      checkedTags.push(value);
    } else if (!checked && index > -1) {
      checkedTags.splice(index, 1);
    }
    this.onChange(checkedTags);
  };

  handleExpand = () => {
    this.setState(prevState => ({
      expand: !prevState.expand
    }));
  };

  render() {
    const { value, expand } = this.state;
    const { children, hideCheckAll, className, style, expandable } = this.props;

    const checkedAll = this.getAllTags().length === value.length;
    const cls = classNames(styles.tagSelect, className, {
      [styles.hasExpandTag]: expandable,
      [styles.expanded]: expand
    });

    return (
      <div className={cls} style={style}>
        {hideCheckAll ? null : (
          <CheckableTag
            checked={checkedAll}
            key="tag-select-__all__"
            onChange={this.onSelectAll}
          >
            全部
          </CheckableTag>
        )}
        {children &&
          React.Children.map(children, child => {
            if (this.isTagSelectOption(child)) {
              return React.cloneElement(child, {
                key: `tag-select-${child.props.value}`,
                value: child.props.value,
                checked: value.indexOf(child.props.value) > -1,
                onChange: this.handleTagChange
              });
            }
            return child;
          })}
        {expandable && (
          <a className={styles.trigger} onClick={this.handleExpand}>
            {expand ? "收起" : "展开"}
            <Icon type={expand ? "up" : "down"} />
          </a>
        )}
      </div>
    );
  }
}

TagSelect.Option = TagSelectOption;

export default TagSelect;
