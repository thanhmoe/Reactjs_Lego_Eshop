import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { cookies, notify } from './main';
import { useTranslation } from 'react-i18next';

import { Button, FloatButton } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import banner1 from '../public/assets/banner1.jpg'
import TopSellingProducts from './components/TopSellingProducts';
import ArticleComponent from './components/ArticleComponent';

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
        <h2>Lego News</h2>
        <div className='news-container'>
          <ArticleComponent />
        </div>
        <FloatButton.BackTop />
      </div >
    </>
  );
}

export default App;
