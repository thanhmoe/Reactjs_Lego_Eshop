import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { cookies, notify } from './main'
import { useTranslation } from "react-i18next"
import homeimg from '/public/assets/home.png'


function App() {
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  const token = localStorage.getItem('auth_token')


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
