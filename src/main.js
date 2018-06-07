import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import 'whatwg-fetch';
import moment from 'moment';
import 'moment/locale/zh-cn';
import stores from './stores';
import App from './App';
moment.locale('zh-cn');

const MOUNT_NODE = document.getElementById('app');// 页面渲染的位置

ReactDOM.render((
  <BrowserRouter>
    <Provider {...stores}>
      <App />
    </Provider>
  </BrowserRouter>
), MOUNT_NODE);
