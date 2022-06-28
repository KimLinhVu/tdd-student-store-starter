import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Orders.css'

export const Orders = () => {
  const [orders, setOrders] = useState([])
  const [searchInput, setSearchInput] = useState('')
  useEffect(() => {
    axios.get('http://localhost:3001/order').then(res => {
      let newOrders = res.data
      setOrders(newOrders)
      if (searchInput !== '') {
        setOrders(newOrders = newOrders.filter((order) => {
          return order.email.toLowerCase().includes(searchInput.toLowerCase())
        }))
      }
    })
  }, [searchInput])

  return (
    <div className="orders">
        <div className="content">
            <h2>Past Orders</h2>
            <div className="search-bar">
                <input type="text" name='order-search' placeholder='Filter By Email' onChange={(e) => {
                  setSearchInput(e.target.value.toLowerCase())
                }} value={searchInput}/>
            </div>
            <div className="table">
                <div className="table-header table-row">
                    <span className='col'>Name</span>
                    <span className='col'>Email</span>
                    <span className='col'>Amount</span>
                    <span className='col'>Date</span>
                </div>
                {orders.map((item) => (
                    <div className="order-row" key={item.id}>
                        <OrderRow order={item}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export function OrderRow ({ order = {} }) {
  return (
    <Link to={`/orders/${order.id}`}>
        <div className="table-row order-row">
            <span className='col'>{order.name}</span>
            <span className='col'>{order.email}</span>
            <span className='col'>{order.total}</span>
            <span className='col'>{order.createdAt}</span>
        </div>
    </Link>
  )
}
