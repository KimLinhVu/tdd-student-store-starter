import React from 'react'
import './ProductView.css'
import { ProductCard } from '../ProductCard/ProductCard'
import { Hero } from '../Hero/Hero'

export const ProductView = ({
  product,
  productId,
  quantity,
  shoppingCart,
  handleAddItemToCart,
  handleRemoveItemToCart
}) => {
  return (
    <div className='product-view'>
      <Hero />
      <div className="contents">
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
    </div>
  )
}
