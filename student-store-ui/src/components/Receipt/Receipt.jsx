import React from 'react'
import './Receipt.css'

export const Receipt = ({ receipt }) => {
  return (
    <div className="checkout">
        <div className="card">
            <header className="card0head">
                <h4 className="card-title">Receipt</h4>
            </header>
            <section className="card-body">
                <p className="header">{receipt[0]}</p>
                <ul className="purchase">
                    {receipt.map((item, idx) => {
                      return idx !== 0 ? <li key={idx}>{item}</li> : null
                    })}
                </ul>
            </section>
        </div>
    </div>
  )
}
