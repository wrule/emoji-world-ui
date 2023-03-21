import 'antd/dist/antd.css';
import './App.scss';
import { View } from './components/View';
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
