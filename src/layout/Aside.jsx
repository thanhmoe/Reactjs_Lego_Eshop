import React from 'react';
import { useNavigate } from 'react-router-dom';


const MenuItem = [
  {
    name: 'Products',
    path: '/products'
  },
  {
    name: 'Contact',
    path: '/contact'
  },
  {
    name: 'News',
    path: '/news'
  }
]


export default function Aside() {
  const navigate = useNavigate();
  return <div className='aside'>
    <div className='groupItem'>
      <ul>
        {MenuItem.map((item, index) => (
          <li className='item' key={index} onClick={() => navigate(item.path)}>
            <a>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  </div>
}