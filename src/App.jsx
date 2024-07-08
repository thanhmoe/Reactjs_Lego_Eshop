import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { cookies, notify } from './main'
import { useTranslation } from "react-i18next"
import { Carousel } from 'antd'

function App() {
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  const contentStyle = {
    margin: 0,
    height: '500px',
    color: '#fff',
    // lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <>
      <div className='carosel container'>
        <Carousel autoplay arrows infinite={true}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
    </>
  )
}

export default App
