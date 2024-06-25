import React, { useEffect } from "react";
import Logo from '../assets/nintendo.svg';
import { DownOutlined, HomeOutlined, ProductOutlined, ReadOutlined, PhoneOutlined, QuestionCircleOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { notify } from "../main";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slice/account/userSlice";
import "./index.css";

export default function Header({ isOpen, setOpen }) {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('auth_token');

  function handleSignOut() {
    dispatch(logoutUser());
    navigate('/login');
    notify('info', `You've been logged out!`);
  }

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  const headerItems = [
    { name: <><HomeOutlined /> {t('Home')}</>, path: '/' },
    { name: <><ProductOutlined /> {t('Products')}</>, path: '/products' },
    { name: <><PhoneOutlined /> {t('Contact')}</>, path: '/contact' },
    { name: <><ReadOutlined /> {t('News')}</>, path: '/news' },
    { name: <><QuestionCircleOutlined /> {t('About Us')}</>, path: '/about' },
  ];

  const userMenuItems = [
    { key: '1', label: t('Setting') },
    { type: 'divider' },
    { label: <a onClick={handleSignOut}>{t('SignOut')}</a>, key: '2' },
  ];

  const languageMenuItems = [
    {
      key: '1',
      label: (
        <div className="countryName" onClick={() => i18next.changeLanguage('en')}>
          <img className="countryFlag" src="/assets/usa.png" alt="usa" />
          <span>{t('English')}</span>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: '2',
      label: (
        <div className="countryName" onClick={() => i18next.changeLanguage('vi')}>
          <img className="countryFlag" src="/assets/vietnam.png" alt="vietnam" />
          <span>{t('Vietnamese')}</span>
        </div>
      ),
    },
  ];

  return (
    <header className="header">
      <div className="brand">
        <div className="logo-brand">
          <img onClick={() => setOpen(!isOpen)} className="imgLogo" src={Logo} alt="logo" />
        </div>
      </div>
      <div className="menu-item">
        <ul>
          {headerItems.map((item, index) => (
            <li key={index} onClick={() => navigate(item.path)}>
              <a>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="user-menu">
        <a><ShoppingCartOutlined /> Cart</a>
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
          <Space> <a><UserOutlined />User </a></Space>
        </Dropdown>
        <Dropdown menu={{ items: languageMenuItems }} trigger={['hover']}>
          <Space> <a>{t('Language')}</a> <DownOutlined /></Space>
        </Dropdown>
      </div>
    </header>
  );
}
