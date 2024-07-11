import React, { useEffect, useState } from "react";

import Logo from '../assets/icons/nintendo.svg';
import CartIcon from '../assets/icons/cart.svg?react';
import UserIcon from '../assets/icons/user.svg?react';
import { HomeFilled, ProductFilled, ReadFilled, PhoneFilled, QuestionCircleFilled } from '@ant-design/icons';
import { Dropdown, Space, Avatar, Badge } from 'antd';
import "./index.css";

import { useNavigate } from "react-router-dom";

import i18next from "i18next";
import { useTranslation } from "react-i18next";

import { notify } from "../main";

import { useSelector, useDispatch } from "react-redux";
import { clearToken, isTokenExpired, getToken } from "../utils/token_utils";
import { getTotalProductInCart } from "../redux/slice/carts/cartsSlice";
// import { getTotalProductCount, addProductToCart } from "../services/cart_serviced";

export default function Header() {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.cartsSlice.totalProduct)

  // const [itemsInCart, SetItemInCart] = useState(0)
  const token = getToken();

  function handleSignOut() {
    clearToken()
    navigate('/login');
    notify('info', `You've been logged out!`);
  }

  const fetchData = async () => {
    dispatch(getTotalProductInCart())
  }

  useEffect(() => {
    if (!token || isTokenExpired()) {
      clearToken();
      navigate('/login');
    }
    fetchData();
  }, []);
  const headerItems = [
    { name: <><HomeFilled /> {t('Home')}</>, path: '/' },
    { name: <><ProductFilled /> {t('Products')}</>, path: '/products' },
    { name: <><PhoneFilled /> {t('Contact')}</>, path: '/contact' },
    { name: <><ReadFilled /> {t('News')}</>, path: '/news' },
    { name: <><QuestionCircleFilled /> {t('About Us')}</>, path: '/about' },
  ];

  const userMenuItems = [
    {
      key: '1',
      label: t('Setting'),
      children: [
        {
          key: '1-1',
          label: <div className="countryName" onClick={() => i18next.changeLanguage('en')}>
            <img className="countryFlag" src="/assets/usa.png" alt="usa" />
            <span>{t('English')}</span>
          </div>,
        },
        {
          key: '1-2',
          label: (
            <div className="countryName" onClick={() => i18next.changeLanguage('vi')}>
              <img className="countryFlag" src="/assets/vietnam.png" alt="vietnam" />
              <span>{t('Vietnamese')}</span>
            </div>
          ),
        },
      ],
    },
    { type: 'divider' },
    { label: <a onClick={handleSignOut}>{t('SignOut')}</a>, key: '2' },
  ];

  return (
    <header>
      <div className="brand">
        <div onClick={() => navigate('/')} className="logo-brand">
          <img className="img-logo" src={Logo} alt="logo" />
        </div>
      </div>
      <div className="menu-item">
        <ul>
          {headerItems.map((item, index) => (
            <li key={index} onClick={() => navigate(item.path)}>
              <a className="icon-header">{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="user-menu">
        <Badge className="icon-header" size="small" count={totalItems} overflowCount={999} offset={[5, 0]}>
          <a className="icon-header" onClick={() => navigate('/cart')}><CartIcon /> {t('Cart')}</a>
        </Badge>
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
          <a className="icon-header"><UserIcon /> {t('User')}</a>
        </Dropdown>
      </div>
    </header>
  );
}
