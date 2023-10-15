import React from 'react';
import ReactDOM from 'react-dom/client';
import Task from './views/Task';
/* use ANTD libary*/
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './index.less';
/* REDUX */
import store from './store';
import { Provider } from 'react-redux';

import './decorator1'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <Task />
        </Provider>
    </ConfigProvider>)