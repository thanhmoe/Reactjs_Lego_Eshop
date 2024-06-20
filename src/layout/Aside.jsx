import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next"
import { MENUITEMS } from '../constants';

export default function Aside() {
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  return <div>
    <div className='groupItem'>
      <ul>
        {MENUITEMS.map((item, index) => (
          <li className='item' key={index} onClick={() => navigate(item.path)}>
            <a>{t(item.name)}</a>
          </li>
        ))}
      </ul>
    </div>
  </div>
}