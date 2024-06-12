import React from "react"
import { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from "antd"
import logoImage from '../../public/assets/logo.png';
import avatar from '../../public/assets/avatar.png';
import { DownOutlined, HomeOutlined, ProductOutlined, ReadOutlined, PhoneOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next"
import { cookies } from "../main";






export default function Header({ isOpen, setOpen }) {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();
  function signOut() {
    const token = cookies.remove('token')
    navigate('/login')

  }

  const headerItem = [
    {
      name: <a><HomeOutlined style={{ color: 'white' }} /> {t('Home')}</a>,
      path: '/',
    },
    {
      name: <a> <ProductOutlined style={{ color: 'white' }} /> {t('Products')}</a>,
      path: '/products',
    },
    {
      name: <a> <PhoneOutlined style={{ color: 'white' }} /> {t('Contact')}</a>,
      path: '/contact'
    },
    {
      name: <a> <ReadOutlined style={{ color: 'white' }} /> {t('News')}</a>,
      path: '/news'
    },
    {
      name: <a> <QuestionCircleOutlined style={{ color: 'white' }} /> {t('About Us')}</a>,
      path: '/about',
    },
  ]


  const items = [
    {
      key: '1',
      label: t('Setting'),
    },
    {
      type: 'divider',
    },
    {
      label: <a onClick={() => signOut()}> {t('SignOut')}  </a>,
      key: '2',
    },
  ];

  const itemsMenuLang = [
    {
      key: '1',
      label: (
        <div className="countryName" onClick={() => i18next.changeLanguage('en')}>
          <img className="countryFlag" src="/assets/usa.png" alt="usa" />
          <span>{t('English')}</span>
        </div>

      ),

    },
    {
      type: 'divider'
    },
    {
      key: '2',
      label: (
        <div className="countryName" onClick={() => i18next.changeLanguage('vi')}>
          <img className="countryFlag" src="/assets/vietnam.png" alt="vietnam" />
          <span>{t('Vietnamese')}</span>
        </div>

      ),
    }
  ];
  return <>


    <div className="header">
      <div className="brand">
        <img onClick={() => setOpen(!isOpen)} className="imgLogo" src={logoImage} alt="" />
        <h2 className="nameBrand" onClick={() => navigate('/')}> New Decade</h2>
      </div>
      <div className="menu-item">
        <ul>
          {headerItem.map((item, index) => (
            <li key={index} onClick={() => navigate(item.path)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="langMenu">
        <Dropdown
          menu={{ items: itemsMenuLang }}
          trigger={['hover']}
        >
          <a className="langMenuText" onClick={(e) => e.preventDefault()}>
            <Space>
              {t('Language')}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>



      <div className="avatar">
        <Dropdown
          menu={{ items }}
          trigger={['click']} >
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