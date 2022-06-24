import React from 'react'
import './ProductView.css'
import { ProductCard } from '../ProductCard/ProductCard'

export const ProductView = ({
  product,
  productId,
  quantity,
  shoppingCart,
  handleAddItemToCart,
  handleRemoveItemToCart
}) => {
  console.log(shoppingCart)
  console.log(productId)
  return (
    <div className='product-view'>
      {/* <Hero /> */}
      <h1 className='product-id'>Product #{productId}</h1>
      <ProductCard
        product={product}
        productId={productId}
        shoppingCart={shoppingCart}
        quantity={quantity}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemToCart={handleRemoveItemToCart}
        showDescription={true}
      />
    </div>
  )
}
