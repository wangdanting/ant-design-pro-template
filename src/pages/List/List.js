import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Input } from 'antd';
import router from 'umi/router';

const { Search } = Input;
class List extends PureComponent {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
    case 'articles':
      router.push(`${match.path}/articles`);
      break;
    case 'applications':
      router.push(`${match.url}/applications`);
      break;
    case 'projects':
      router.push(`${match.url}/projects`);
      break;
    default:
      break;
    }
  };

  handleFormSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
  };

  render() {
    const { match, children, location } = this.props;
    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const tabList = [
      {
        key: 'articles',
        tab: '文章',
      },
      {
        key: 'projects',
        tab: '项目',
      },
      {
        key: 'applications',
        tab: '应用',
      },
    ];
    return (
      <PageHeaderWrapper
        title="搜索列表"
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default List;
