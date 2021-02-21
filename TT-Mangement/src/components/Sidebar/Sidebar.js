import React from "react";
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeFilled,
  SettingFilled,
  ScheduleFilled,
  IdcardFilled,
  PlusSquareFilled
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Sidebar = () => {
  return (
    <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"

    >
      <Menu.Item key="1" icon={<HomeFilled />} >
        <Link to='/'>
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<ScheduleFilled />}>
        Schedule
      </Menu.Item>
      <SubMenu key="sub1" icon={<IdcardFilled />} title="Members">
        <Menu.Item key="3">
          <Link to='/members'>
            Overview
          </Link>
        </Menu.Item>
        <Menu.Item key="4">Add Member</Menu.Item>
        <Menu.Item key="5">Find Member</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<PlusSquareFilled />} title="Matches">
        <Menu.Item key="6">Overview</Menu.Item>
        <Menu.Item key="7">Create Matches</Menu.Item>
      </SubMenu>
      <Menu.Item key="8" icon={<SettingFilled />}>
        Setting
      </Menu.Item>
    </Menu>
  )

}

export default Sidebar;
