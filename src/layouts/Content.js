import React from "react";
import { Layout } from "antd";
import { Route, Redirect } from "react-router-dom";
import SubMenuOne from '../pages/menuone/SubMenuOne';
import SubMenuTwo from '../pages/menuone/SubMenuTwo';
import SubMenuThree from '../pages/menutwo/SubMenuThree';
import SubMenuFour from '../pages/menutwo/SubMenuFour';

/**
 * 路由
 */
export default class Content extends React.Component {
  render() {
    return (
      <Layout.Content className="express-content">
        <Route
          exact
          path="/menuone/submenuone"
          component={SubMenuOne}
        />
        <Route
          exact
          path="/menuone/submenutwo"
          component={SubMenuTwo}
        />
        <Route
          exact
          path="/menutwo/submenuthree"
          component={SubMenuThree}
        />
        <Route
          exact
          path="/menutwo/submenufour"
          component={SubMenuFour}
        />
      </Layout.Content>
    );
  }
}
