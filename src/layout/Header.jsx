import React, { useEffect, useState } from "react";

import Logo from '../assets/icons/nintendo.svg';
import CartIcon from '../assets/icons/cart.svg?react';
import UserIcon from '../assets/icons/user.svg?react';
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HomeFilled, ProductFilled, ReadFilled, PhoneFilled, QuestionCircleFilled, DownOutlined } from '@ant-design/icons';

import { Badge, Drawer, Button, List, Menu, Dropdown, Space } from 'antd';

import { NavLink, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { notify } from "../main";

import { clearToken, isTokenExpired, getToken, setTokenToRedirect } from "../utils/token_utils";

import { useSelector, useDispatch } from "react-redux";
import { getTotalProductInCart } from "../redux/slice/carts/cartsSlice";

import LanguageDropdown from "../components/LanguageDropdown";
import "./index.css";

export default function Header() {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.cartsSlice.totalProduct);
  const token = getToken();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  function handleSignOut() {
    clearToken();
    setOpen(false);
    navigate('/login');
    notify('info', t('Log_Out_Success_noti'));
  }

  const fetchData = async () => {
    dispatch(getTotalProductInCart());
  };

  useEffect(() => {
    const checkAndFetchData = async () => {
      if (isTokenExpired()) {
        clearToken();
      } else if (token) {
        await fetchData();
      }
    }
    checkAndFetchData();
  }, [token, dispatch]);

  const headerItems = [
    { name: <><HomeFilled /> {t('Home')}</>, path: '/' },
    { name: <><ProductFilled /> {t('Products')}</>, path: '/products' },
    // { name: <><PhoneFilled /> {t('Contact')}</>, path: '/contact' },
    // { name: <><ReadFilled /> {t('News')}</>, path: '/news' },
    // { name: <><QuestionCircleFilled /> {t('About Us')}</>, path: '/about' },
  ];

  return (
    <header>
      <div className="brand">
        <div onClick={() => navigate('/')} className="logo-brand">
          <img className="img-logo" src={Logo} alt="logo" />
        </div>
      </div>
      <div className={`menu-item ${menuOpen ? 'active' : ''}`}>
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
          <li>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? "active icon-header" : "icon-header")}>
              <FontAwesomeIcon icon={faReceipt} /> {t('Orders')}
            </NavLink>
          </li>
          <li>
            <Badge className="icon-header" size="small" count={totalItems} overflowCount={999} offset={[5, 0]}>
              <NavLink to="/cart" className={({ isActive }) => (isActive ? "active icon-header" : "icon-header")}>
                <CartIcon /> {t('Cart')}
              </NavLink>
            </Badge>
          </li>
        </ul>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="hamburger"></div>
        <div className="hamburger"></div>
        <div className="hamburger"></div>
      </div>
      <div className="user-icon">
        <LanguageDropdown />
        {token ? <a onClick={showDrawer} className="icon-header"><UserIcon /> {t('User')}</a>
          : <a className="icon-header" onClick={() => navigate('/login')}><UserIcon /> {t('User-no-token')}</a>}
      </div>
      <Drawer title="User" onClose={onClose} open={open} footer={
        <Button onClick={handleSignOut} style={{ width: '100%' }}>{t('SignOut')}</Button>
      }>
        <List>
          <List.Item style={{ cursor: 'pointer' }} onClick={() => navigate('/cart')}>{t('Cart_user')} </List.Item>
          <List.Item style={{ cursor: 'pointer' }} onClick={() => navigate('/orders')}>{t('Orders')} </List.Item>
          <List.Item style={{ cursor: 'pointer' }} onClick={() => navigate('/change-password')}>{t('Change_Password')} </List.Item>
        </List>
      </Drawer>
    </header>
  );
}
