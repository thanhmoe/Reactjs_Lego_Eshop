import React from "react"
import { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from "antd"
import logoImage from '../../public/assets/logo.png';
import avatar from '../../public/assets/avatar.png';
import { DownOutlined, HomeOutlined, ProductOutlined, ReadOutlined, PhoneOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from "react-router-dom";



const handleLanguageChange = (event) => {
  const lang = event.target.value;
  setSelectedLanguage(lang.nativeName); z
  i18next.changeLanguage(lang)
};


const items = [
  {
    key: '1',
    type: 'group',
    label: 'Group title',
    children: [
      {
        key: '1-1',
        label: '1st menu item',
      },
      {
        key: '1-2',
        label: '2nd menu item',
      },
    ],
  },
  {
    key: '2',
    label: 'sub menu',
    children: [
      {
        key: '2-1',
        label: '3rd menu item',
      },
      {
        key: '2-2',
        label: '4th menu item',
      },
    ],
  },
];



export default function Header({ isOpen, setOpen }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const navigate = useNavigate();
  return <>

    <div className="header">
      <div className="brand">
        <img onClick={() => setOpen(!isOpen)} className="imgLogo" src={logoImage} alt="" />
        <h2 className="nameBrand" onClick={() => navigate('/')}> New Decade</h2>
      </div>
      <div className="menu-item">
        <ul>
          <li><a><HomeOutlined style={{ color: 'white' }} /> Home</a></li>
          <li><a> <ProductOutlined style={{ color: 'white' }} /> Product</a></li>
          <li><a> <ReadOutlined style={{ color: 'white' }} /> News</a></li>
          <li><a> <PhoneOutlined style={{ color: 'white' }} /> Contact</a></li>
          <li><a> <QuestionCircleOutlined style={{ color: 'white' }} /> About</a></li>
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