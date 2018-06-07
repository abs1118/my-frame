import React, { Component } from "react";
import { inject } from "utils/mobx-react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

@inject("globalStore")
export default class Header extends Component {
  componentDidMount() {
  }

  render() {
    const { pathname } = this.props;
    return (
      <Layout.Header className="header">
        {this.props.globalStore.realName}
      </Layout.Header>
    );
  }
}
