import React from 'react';
import { useNavigate } from 'react-router-dom';
import i18next from "i18next";
import { useTranslation } from "react-i18next"





export default function Aside() {
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);

  const MenuItem = [
    {
      name: t('Products'),
      path: '/products',
    },
    {
      name: t('Contact'),
      path: '/contact'
    },
    {
      name: t('News'),
      path: '/news'
    }
  ]



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