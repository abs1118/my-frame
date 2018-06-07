import React from 'react';
import {inject} from 'utils/mobx-react';
import { Link } from "react-router-dom";
import {Form, Input, Button, Radio, Tabs} from 'antd';

const FormItem = Form.Item;
const FormControl = Form.Control;
const TabPane = Tabs.TabPane;

@Form.create() // 必须加此行代码，才能将form注入到组件props中
@inject('subMenuTwoStore') // 将store注入到props中
export default class SubMenuTwo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        我是子菜单二
      </div>
    );
  }
}
