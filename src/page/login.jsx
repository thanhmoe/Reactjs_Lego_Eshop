import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../public/assets/bg.jpg';
import { cookies, notify } from '../main';
import './login.css';

const myAccount = {
    username: 'thanh',
    password: '123'
}
const fakeToken = 'ey123123123123'

const Login = () => {
    const [interacted, setInteracted] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [isCheck, setIsCheck] = useState(false);


    const navigate = useNavigate();

    const submit = () => {
        if (isValid()) {
            cookies.set('token', fakeToken)
            navigate('/')
            notify('success', 'Logged In!', 'top-right')
            if (isCheck) {
                cookies.set('user', myAccount)
            }
        }
    }

    //check valid login
    const isValid = () => {
        let isValid = true
        if (user.username !== myAccount.username || user.password !== myAccount.password) {
            alert('Fail to login!')
            isValid = false
        }
        return isValid
    }

    const handleChange = (type, value) => {
        setInteracted(true)
        setUser({
            ...user,
            [type]: value
        })
    }

    //lay du lieu dang nhap tu cookies
    useEffect(() => {
        const savedUser = cookies.get('user')

        if (savedUser) {
            setUser({
                username: savedUser.username,
                password: savedUser.password,
            })
            setIsCheck(true)
        }

    }, [])

    const isActive = user.username === '' || user.password === '';
    //login form
    return <div className='container'>
        <img className='backgroundImage' src={backgroundImage} alt="" />
        <div className='formLogin'>
            <h3 className='decs'>LOGIN TO X</h3>
            <p className='decs'>Become a W3Schooler</p>
            <div className='form-group'>
                <input
                    className='forminput'
                    placeholder='Your User Name'
                    type="text"
                    value={user.username}
                    onChange={(e) => handleChange('username', e.target.value)} />
                <input
                    className='forminput'
                    type="password"
                    placeholder='Your Password'
                    value={user.password}
                    onChange={(e) => handleChange('password', e.target.value)} />
                {(isActive && interacted) ? <span className='form-message'>Not valid</span> : null}
            </div>
            <input
                type='checkbox'
                checked={isCheck}
                onChange={(e) => setIsCheck(e.target.checked)} />
            <label htmlFor="checkbox">Remember Me</label>
            <div className='btn-group'>
                <button className='btnLogin' onClick={submit} disabled={isActive}>Login</button>
            </div>
        </div>
    </div>
}

export default Login;
