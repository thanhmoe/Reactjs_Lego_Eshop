import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { cookies, notify } from './main'
import { useTranslation } from "react-i18next"
import { CCarousel } from '@coreui/react'
import homeimg from '/public/assets/home.png'

let user1 = {
  username: 'thanhhhh',
  password: '123',
  confirm: '123'
}

function App() {
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  //kiem tra xem da co token dang nhap chua
  useEffect(() => {
    const token = cookies.get('token')
    if (!token) {
      navigate('/login')
      // notify('info', 'Please Login First!', 'top-center')
    }
  }, [])

  return (
    <>
      <section>
        <h2 className="slide-in-left">{t('Welcome')}</h2>
        <p className="slide-in-left short-paragraph">Hi, I'm a web developer with a passion for creating interactive and visually appealing websites. This is a sample homepage to demonstrate some basic web development techniques.</p>
      </section>
      <section>
        <img src={homeimg} alt="A beautiful scenery" className="slide-in-right animated-image"></img>
      </section>
    </>
  )
}

export default App
