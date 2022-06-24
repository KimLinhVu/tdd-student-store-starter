import React, { useState, useEffect } from 'react'
import './ProductDetail.css'
import { ProductView } from '../ProductView/ProductView'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const ProductDetail = ({
  shoppingCart,
  handleAddItemToCart,
  handleRemoveItemToCart
}) => {
  const [product, setProduct] = useState('')
  const { productId } = useParams()

  useEffect(() => {
    axios.get(`https://codepath-store-api.herokuapp.com/store/${productId}`).then(res => {
      setProduct(res.data.product)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className='product-detail'>
      {product !== ''
        ? <ProductView
        product={product}
        productId={parseInt(productId)}
        shoppingCart={shoppingCart}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemToCart={handleRemoveItemToCart}
      />
        : null}
    </div>
  )
}
