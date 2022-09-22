import React from 'react';
import ReactDom from 'react-dom'
import '../css/Modal.css'

export default function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null

  // console.log(data)
  
  return ReactDom.createPortal(
    <>
      <div className='overlay' />
      <div className='modal'>
        <div className='closeBtn'>
          <button onClick={onClose}>&times;</button>
        </div>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  )
}