import i18next from "i18next"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { cookies, notify } from './main'
import { useTranslation } from "react-i18next"
import { Button } from "antd"


let user1 = {
  username: 'thanhhhh',
  password: '123',
  confirm: '123'
}

function App() {
  const navigate = useNavigate();
  const {t} = useTranslation(['product', 'common']);

 
  //kiem tra xem da co token dang nhap chua
  // useEffect(() => {
  //   const token = cookies.get('token')
  //   if (!token) {
  //     navigate('/login')
  //     notify('info', 'Please Login First!', 'top-center')

  //   }
  // }, [])

  return (
    <>
      <p>{t('productName')}</p>
      <p>{t('confirm', {ns: 'common'})}</p>
    </>
  )
}

export default App
