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
        <div className='closeBtn'>
          <button onClick={onClose}>&times;</button>
        </div>
        <h3>{`Incidents in ${selected}`}</h3>
        {data.map(d => 
          <div className='modalCard' key={d.id}>
            <span>
              {d.name}
              <a href={d.page}>CPJ page</a>
            </span>
            <p dangerouslySetInnerHTML={{__html: d.body}} />
          </div>
        )}
      </div>
    </>,
    document.getElementById('portal')
  )
}