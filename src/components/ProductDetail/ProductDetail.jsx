import React, { useState, useEffect } from 'react'
import './ProductDetail.css'
import { ProductView } from '../ProductView/ProductView'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const ProductDetail = ({
  isFetching,
  setIsFetching,
  shoppingCart,
  handleAddItemToCart,
  handleRemoveItemToCart,
  setError
}) => {
  const [product, setProduct] = useState('')
  const { productId } = useParams()

  useEffect(() => {
    setIsFetching(true)
    axios.get(`https://codepath-store-api.herokuapp.com/store/${productId}`).then(res => {
      setProduct(res.data.product)
    }).catch(err => {
      setError(err)
    })
    setIsFetching(false)
  }, [])

  return (
    <div className='product-detail'>
      {isFetching
        ? <h1>Loading...</h1>
        : <ProductView
        product={product}
        productId={parseInt(productId)}
        shoppingCart={shoppingCart}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemToCart={handleRemoveItemToCart}
      />}
    </div>
  )
}
