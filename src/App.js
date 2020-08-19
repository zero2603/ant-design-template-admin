import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import store from './redux/store';
import MainApp from './container/MainApp';
import { NotificationContainer } from 'react-notifications';
// css
import 'antd/dist/antd.css';
import './assets/css/custom.css';
import './assets/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import 'react-notifications/lib/notifications.css';
import 'antd-mobile/dist/antd-mobile.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// locale
import moment from 'moment';
import 'moment/locale/vi'  // without this line it didn't work
import vi_VN from 'antd/lib/locale-provider/vi_VN';
moment.locale('vi')

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConfigProvider locale={vi_VN}>
          <BrowserRouter basename='/admin'>
            <MainApp />
            <NotificationContainer />
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    )
  }
}
