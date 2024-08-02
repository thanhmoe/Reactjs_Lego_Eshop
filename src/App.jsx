import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { cookies, notify } from './main';
import { useTranslation } from 'react-i18next';

import { Button, FloatButton } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import banner1 from '../public/assets/banner1.jpg'
import TopSellingProducts from './components/TopSellingProducts';
import BannerCarousel from './components/BannerCarousel';

function App() {
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  return (
    <>
      <div className='app-container'>
        {/* <div className='banner'>
          <div className='label-banner'>
            <h2>{t("Banner_label1")}</h2>
            <p>{t('Banner_text1')}</p>
            <Button onClick={() => navigate('/products/68')} style={{ height: '40px', marginTop: '3rem', }}>{t('Shop_Now')} {<RightOutlined />}</Button>
          </div>
          <img className='image-banner' src={banner1} alt="banner1" />
        </div> */}
        <BannerCarousel />
        <div className='top-selling-products-container'>
          <TopSellingProducts />
        </div>
        {/* <h2 className='news-label'>{t('Lego_News')}</h2>
        <div className='container-news'>
          <div>
            <ArticlesCarousel />
          </div>
        </div> */}
        <FloatButton.BackTop />
      </div >
    </>
  );
}

export default App;
