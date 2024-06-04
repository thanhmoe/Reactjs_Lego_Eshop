import i18next from "i18next"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { cookies, notify } from './main'
import { useTranslation } from "react-i18next"
import { Button } from "antd"
import { CCarousel } from '@coreui/react'

let user1 = {
  username: 'thanhhhh',
  password: '123',
  confirm: '123'
}

function App() {
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  //kiem tra xem da co token dang nhap chua
<<<<<<< HEAD
  // useEffect(() => {
  //   const token = cookies.get('token')
  //   if (!token) {
  //     navigate('/login')
  //     notify('info', 'Please Login First!', 'top-center')

  //   }
  // }, [])
=======
  useEffect(() => {
    const token = cookies.get('token')
    if (!token) {
      navigate('/login')
      notify('info', 'Please Login First!', 'top-center')
    }
  }, [])
>>>>>>> fdcf4dc3108751c2ab35407cb2cd3a7ae973f9d6

  return (
    <>
      <CCarousel />
      <p>{t('Welcome')}</p>
    </>
  )
}

export default App
