"use client"

import { useState, useEffect } from 'react'
import { ProductCard } from '../../../_components/product-card'
import { Product } from '@prisma/client'

interface SellerProductsProps {
  sellerId: string
}

export function SellerProducts({ sellerId }: SellerProductsProps) {
  const [products, setProducts] = useState<Product[]>([])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products by this Seller</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-center text-muted-foreground">This seller has no products yet.</p>
      )}
    </div>
  )
}