import 'antd/dist/antd.min.css';
import './App.scss';
import { View } from './components/View';
import { Layout } from 'antd';
import { Connector } from './Connector';
import { Test } from './Test';
const { Header, Content } = Layout;

function App() {
  return <Layout className="layout">
    <Header className="header">
      <span className="logo">Emoji 🌍 World</span>
      <Connector />
    </Header>
    <Content className="content">
      {/* <View /> */}
      <Test />
    </Content>
  </Layout>;
}

export default App;
