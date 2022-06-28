import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './OrderDetail.css'
import { Receipt } from '../Receipt/Receipt'
import axios from 'axios'

export const OrderDetail = () => {
  const [order, setOrder] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { orderId } = useParams()

  useEffect(() => {
    setIsLoading(true)
    axios.get(`http://localhost:3001/order/${orderId}`).then(res => {
      setOrder(res.data)
      setIsLoading(false)
    })
  }, [])
  return (
    <div className="order-detail">
       {!isLoading
         ? <div className="order-card cards">
                <div className="card-header">
                    <h3>Order #{orderId}</h3>
                </div>
                <div className="card-content">
                    <Receipt receipt={order.receipt}/>
                </div>
                <div className="card-footer">
                    <p className='amount'>Total Cost: {order.total}</p>
                    <p className="date">{order.createdAt}</p>
                </div>
            </div>
         : null}
    </div>
  )
}
