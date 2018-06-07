import React, { Component } from "react";
import { inject } from "utils/mobx-react";
import { Menu,Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

const { Item, SubMenu } = Menu;

const menus = [
  {
    // 左侧菜单导航
    key: "menuone",
    display: "菜单一",
    submenus: [
      {
        key: "submenuone",
        display: "子菜单一"
      },
      {
        key: "submenutwo",
        display: "子菜单二"
      }
    ]
  },
  {
    key: "menutwo",
    display: "菜单二",
    submenus: [
      {
        key: "submenuthree",
        display: "子菜单三"
      },
      {
        key: "submenufour",
        display: "子菜单四"
      }
    ]
  }
];

class Sidebar extends Component {
  render() {
    const { location } = this.props;
    const selectedKeys = [];
    menus.some(group => {
      const menu = group.submenus.find(
        item =>
          `/${group.key}/${item.key}` === location.pathname.toLocaleLowerCase()
      );
      if (menu) {
        selectedKeys.push(menu.key);
        return true;
      }
    });
    return (
      <Menu
        selectedKeys={selectedKeys}
        mode="inline"
      >
        {menus.map(group => (
        <SubMenu key={group.key} title={<span><Icon type="mail" /><span>{group.display}</span></span>}>
          {group.submenus.map(item => (
            <Item key={item.key}>
              <Link to={`/${group.key}/${item.key}`}>{item.display}</Link>
            </Item>
          ))}
        </SubMenu>
        ))}
      </Menu>
    );
  }
}

export default withRouter(Sidebar);
