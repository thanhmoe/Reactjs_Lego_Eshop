import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { cookies, notify } from './main'

let user1 = {
  username: 'thanhhhh',
  password: '123',
  confirm: '123'
}

function notLogin() {
  notify('info', 'Please Login First!', 'top-center')
}

function App() {

  const navigate = useNavigate();

  //kiem tra xem da co token dang nhap chua
  useEffect(() => {
    const token = cookies.get('token')
    if (!token) {
      navigate('/login')
      notLogin()

    }
  }, [])

  return (
    <>
      <h2>This is ApP</h2>
      <h2>This is ApP</h2>
    </>
  )
}

export default App
