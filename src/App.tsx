import React from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.scss';
import { Emoji } from './components/Emoji';
import { View } from './components/View';
import { Profile } from './Profile';
import { Layout } from 'antd';
import { Connector } from './Connector';
const { Header, Content } = Layout;

function App() {
  return <Layout className="layout">
    <Header className="header">
      <span className="logo">Emoji 🌍 World</span>
      <Connector />
    </Header>
    <Content className="content">
      <View />
    </Content>
  </Layout>;
}

export default App;
