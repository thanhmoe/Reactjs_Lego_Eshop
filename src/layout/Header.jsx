import React, { useEffect, useState } from "react";

import Logo from '../assets/icons/nintendo.svg';
import CartIcon from '../assets/icons/cart.svg?react';
import UserIcon from '../assets/icons/user.svg?react';

import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { HomeFilled, ProductFilled, ReadFilled, PhoneFilled, QuestionCircleFilled } from '@ant-design/icons';
import { Badge, Drawer, Button, List } from 'antd';

import { NavLink, useNavigate } from "react-router-dom";

import i18next from "i18next";
import { useTranslation } from "react-i18next";

import { notify } from "../main";

import { useSelector, useDispatch } from "react-redux";
import { clearToken, isTokenExpired, getToken, setTokenToRedirect } from "../utils/token_utils";
import { getTotalProductInCart } from "../redux/slice/carts/cartsSlice";

import "./index.css";

export default function Header() {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.cartsSlice.totalProduct);
  const token = getToken();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  function handleSignOut() {
    clearToken();
    setOpen(false);
    navigate('/login');
    notify('info', `You've been logged out!`);
  }

  const fetchData = async () => {
    dispatch(getTotalProductInCart());
  };

  useEffect(() => {
    if (!token || isTokenExpired()) {
      setTokenToRedirect();
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
          label: (
            <div className="countryName" onClick={() => i18next.changeLanguage('en')}>
              <img className="countryFlag" src="/assets/usa.png" alt="usa" />
              <span>{t('English')}</span>
            </div>
          ),
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
    {
      key: '2',
      label: t('Cart_user'),
    },
    {
      key: '3',
      label: t('Orders')
    }
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
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active icon-header" : "icon-header")}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="user-menu">
        <NavLink to="/orders" className={({ isActive }) => (isActive ? "active icon-header" : "icon-header")}>
          <FontAwesomeIcon icon={faReceipt} /> {t('Orders')}
        </NavLink>
        <Badge className="icon-header" size="small" count={totalItems} overflowCount={999} offset={[5, 0]}>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "active icon-header" : "icon-header")}>
            <CartIcon /> {t('Cart')}
          </NavLink>
        </Badge>
        <a onClick={showDrawer} className="icon-header"><UserIcon /> {t('User')}</a>
      </div>
      <Drawer title="User" onClose={onClose} open={open} footer={
        <Button onClick={handleSignOut} style={{ width: '100%' }}>{t('SignOut')}</Button>
      }>
        <List>
          {userMenuItems.map((item) => (
            <React.Fragment key={item.key}>
              <List.Item style={{ cursor: 'pointer' }}>{item.label}</List.Item>
              {item.children && item.children.map((child) => (
                <List.Item key={child.key} style={{ cursor: 'pointer', paddingLeft: '24px' }}>
                  {child.label}
                </List.Item>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </header>
  );
}
