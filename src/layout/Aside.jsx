import React from 'react';

const MenuItem = [
  {
    name: '',
    path: ''
  }
]


export default function Aside() {
  return <div className='aside'>
    <div className='groupItem'>
      <ul>
        <li className='item'><a>Nav1</a></li>
        <li className='item'><a>Na2</a></li>
        <li className='item'><a>Na3</a></li>
      </ul>
    </div>
  </div>
}