import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'antd/dist/antd.dark.css';
import { Layout } from 'antd';

import Sidebar from "./components/Sidebar/Sidebar";
import MemberOverview from "./components/Member/MemberOverview/MemberOverview";
const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{minHeight: '100vh'}}>
        <Sider>
          <Sidebar/>
        </Sider>
        <Layout>
          <Header>
            Header
          </Header>
          <Content>
            <Switch>
              <Route path='/members' exact component={MemberOverview}/>
            </Switch>
          </Content>
          <Footer>
            Footer
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
