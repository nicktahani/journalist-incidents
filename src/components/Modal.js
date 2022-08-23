import React from 'react';
import ReactDom from 'react-dom'

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null

  return ReactDom.createPortal(
    <>
      <div className='overlay' />
      <div className='modal'>
        <button onClick={onClose}>X</button>
        hello
      </div>
    </>,
    document.getElementById('portal')
  )
}