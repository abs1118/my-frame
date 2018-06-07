import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject } from 'utils/mobx-react';
import { Layout, Spin,Icon } from 'antd';
// import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Content from './layouts/Content';
import './styles/index.less';

const { Sider,Header } = Layout;

/**
 * 页面组件入口，引入布局
 * Loading -- 遮罩层，加载中
 *   Layout -- 布局
 *     Header -- 顶部导航
 *     Layout -- 布局
 *       Sidebar -- 左侧导航
 *       Content -- 右侧内容
 */
@inject('globalStore') // 注入globalStore到本组件，可选store为main.js中注入的stores
class App extends Component {

  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { globalStore,location } = this.props;
    const { loading } = globalStore;
    return (
      <Spin spinning={loading}>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            breakpoint="lg"
            collapsedWidth={0}
            collapsed={this.state.collapsed}
          >
            <Sidebar />
          </Sider>

          <Layout>
            <Header className="express-header">
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
              <Content/>
          </Layout>
        </Layout>
      </Spin>
    );
  }
}

export default withRouter(App);
