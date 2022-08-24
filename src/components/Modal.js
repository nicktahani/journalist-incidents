import React from 'react';
import ReactDom from 'react-dom'
import '../css/Modal.css'

export default function Modal({ data, isOpen, onClose, selected }) {
  if (!isOpen) return null

  console.log(data)
  
  return ReactDom.createPortal(
    <>
      <div className='overlay' />
      <div className='modal'>
        <button onClick={onClose}>X</button>
        {data.map(d => (
          <div>
            {d.name}
          </div>
        ))}
      </div>
    </>,
    document.getElementById('portal')
  )
}