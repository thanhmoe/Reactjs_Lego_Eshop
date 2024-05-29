import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './page/login'
import Cookies from 'universal-cookie'
import { cookies, notify } from './main'
import { useNavigate } from 'react-router-dom'






// //-------------------------------------//
//bai 1
function cToFarament(value) {
  return value * 9 / 5 + 32
}



// //-------------------------------------//
// bai2
function repeatString(str) {
  return Array(10).fill(str).join('-')
}



// //-------------------------------------//
//bai3
function checkHigherNum(n1, n2) {
  if (isNaN(n1.toString()) || isNaN(n2.toString())) {
    console.log('khong phai so')
  } else {
    return Math.max(n1, n2)
  }
}



// //-------------------------------------//
//bai 4
function factoria(n) {
  if (Number.isInteger(n) || n >= 0) {
    let result = 1
    for (let i = 1; i <= n; i++) {
      result *= i
    } return result
  } else {
    console.log('so khong hop le')
  }
}


// //-------------------------------------//
//bai5
function spitString(str15) {
  if (str15.length < 15) {
    console.log('nhap du 15 ky tu')
    return
  }
  var cuttedStr = str15.slice(0, 10) + '...'
  console.log(cuttedStr)
}



////-------------------------------------//
//bai6
function captalFirstletter(input) {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
}
let str = 'heLLo TheRE'



//Bai7
function arrangeArr(arr) {
  return arr.filter(element => element % 2 == 0).sort((a, b) => b - a);
}

var inputArray = [
  0, 2, 5, 3, 8, 1, 9, 4, 7
]



// //bai8

function checkValid(user) {
  let isvalid = true
  if (user1.username === '' || user1.username > 20) {
    isvalid = false
  }
  if (user1.password < 6 && user1.username > 32) {
    isvalid = false
  }
  if (user1.confirm !== user1.password) {
    isvalid = false
  }
  console.log(isvalid)
  return isvalid


}
let user1 = {
  username: 'thanhhhh',
  password: '123',
  confirm: '123'
}

function notLogin() {
  notify('warn', 'Please Login First!', {})
}


function App() {

  const navigate = useNavigate();
  
//kiem tra xem da co token dang nhap chua
  useEffect(() => {
    const token = cookies.get('token')
    const user = cookies.get('user')
    // console.log('token', token)
    // console.log('here user', user)
    if (!token) {
      navigate('/login')
      notLogin()

    }
  }, [])

  return (
    <>
      <div>
        <h1>hello</h1>
      </div>
    </>
  )
}

export default App
