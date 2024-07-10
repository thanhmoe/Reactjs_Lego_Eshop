import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { cookies, notify } from './main';
import { useTranslation } from 'react-i18next';

import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import banner1 from '../public/assets/banner1.jpg'
import TopSellingProducts from './components/TopSellingProducts';

function App() {
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  return (
    <>
      <div className='app-container'>
        <div className='banner'>
          <div className='label-banner'>
            <h2>A model of Italian perfection</h2>
            <p>The new LEGO® Icons Lamborghini Countach 5000 Quattrovalvole has arrived.</p>
            <Button onClick={() => navigate('/products/68')} style={{ height: '40px', marginTop: '5rem', }}>Shop Now {<RightOutlined />}</Button>
          </div>
          <img src={banner1} alt="banner1" />
        </div>
        <div className='top-selling-products-container'>
          <TopSellingProducts />
        </div>
      </div >
    </>
  );
}

export default App;
