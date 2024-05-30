import React from "react"
import { Breadcrumb, Layout, Menu, theme } from "antd"
import logoImage from '../../public/assets/logo.png';
import avatar from '../../public/assets/avatar.png';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const items = [
  {
    label: <a href="">Accout</a>,
    key: '0',
  },
  {
    label: <a href="">Setting</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'logout',
    key: '3',
  },
];



export default function Header({isOpen,setOpen}) {

  return <>

    <div className="header">
      <div className="brand">
        <img onClick={()=> setOpen(!isOpen)} className="imgLogo" src={logoImage} alt="" />
        <h2> New Decade</h2>
      </div>
      <div className="menu-item">
        <ul>
          <li><a>Home</a></li>
          <li><a>Product</a></li>
          <li><a>News</a></li>
          <li><a>Contact</a></li>
          <li><a>About</a></li>
        </ul>
      </div>
      <div className="avatar">
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <img className="imgAvatar" src={avatar} alt="" />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>

  </>
}