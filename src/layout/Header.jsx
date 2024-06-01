import React from "react"
import { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from "antd"
import logoImage from '../../public/assets/logo.png';
import avatar from '../../public/assets/avatar.png';
import { DownOutlined, HomeOutlined, ProductOutlined, ReadOutlined, PhoneOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import i18next from "i18next";

const itemsLangChoice = [
  {
    key: '1',
    label: (
      <div className="countryName" onClick={() => i18next.changeLanguage('en')}>
        <img className="countryFlag" src="/assets/usa.png" alt="usa"/>
        <span>English</span>
      </div>

    ),

  },
  {
    key: '2',
    label: (
      <div  className="countryName" onClick={() => i18next.changeLanguage('vi')}>
        <img className="countryFlag" src="/assets/vietnam.png" alt="vietnam"/>
        <span>Vietnamese</span>
      </div>

    ),
  }
];

const items = [
  {
    key: '1',
    label: 'Setting',
  },
  {
    type: 'divider',
  },
  {
    label: 'Logout',
    key: '3',
  },
];



export default function Header({ isOpen, setOpen }) {

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
      <div className="langChoice">
        <Dropdown
          menu={{ items: itemsLangChoice }}
          trigger={['hover']}
        >
          <a className="langChoiceText">
            <Space>
              Language
            <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>



      <div className="avatar">
        <Dropdown
          menu={{ items }}
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