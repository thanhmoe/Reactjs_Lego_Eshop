import React, { useEffect, useState } from "react"
import logo from '../assets/nintendo.svg'
import { DownOutlined, HomeOutlined, ProductOutlined, ReadOutlined, PhoneOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next"
import { cookies, notify } from "../main";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slice/account/userSlice";

export default function Header({ isOpen, setOpen }) {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('auth_token')

  //handle sign out
  function handleSignOut() {
    dispatch(logoutUser());
    navigate('/login');
    notify('info', `You've been log out!`)
  }

  //check token login
  useEffect(() => {
    if (!token) {
      navigate('/login')
      // notify('info', 'Please Login First!')
    }
  }, [token])

  const headerItem = [
    {
      name: <a><HomeOutlined /> {t('Home')}</a>,
      path: '/',
    },
    {
      name: <a> <ProductOutlined /> {t('Products')}</a>,
      path: '/products',
    },
    {
      name: <a> <PhoneOutlined /> {t('Contact')}</a>,
      path: '/contact'
    },
    {
      name: <a> <ReadOutlined /> {t('News')}</a>,
      path: '/news'
    },
    {
      name: <a> <QuestionCircleOutlined /> {t('About Us')}</a>,
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
      label: <a onClick={() => handleSignOut()}> {t('SignOut')}  </a>,
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

    <header>
      <div className="brand">
        {/* <img onClick={() => setOpen(!isOpen)} className="imgLogo" src={logo} alt="" /> */}
        <a href={logo}/>
          
        {/* <h2 className="nameBrand" onClick={() => navigate('/')}> New Decade</h2> */}
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
          onClick={(e) => e.preventDefault()}
        >
          <Space>
            {t('Language')}
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>

      <div className="avatar">
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          onClick={(e) => e.preventDefault()} >
          <Space>
            <UserOutlined />
          </Space>
        </Dropdown>
      </div>
    </header>

  </>
}