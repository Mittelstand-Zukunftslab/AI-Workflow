import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-gray-900 underline">
          Back to shop
        </Link>
      </main>
    )
  }

  function handleAdd() {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm text-gray-500 hover:text-gray-900">
        &larr; Back
      </button>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-wide text-gray-400">{product.category}</p>
          <h1 className="mt-1 text-2xl font-semibold text-gray-900">{product.name}</h1>
          <p className="mt-3 text-xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>

          <div className="mt-8 flex items-center gap-3">
            <label htmlFor="qty" className="text-sm text-gray-600">
              Quantity
            </label>
            <div className="flex items-center rounded-md border border-gray-300">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-gray-600 hover:text-gray-900"
              >
                −
              </button>
              <span id="qty" className="w-8 text-center text-sm">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1.5 text-gray-600 hover:text-gray-900"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="mt-6 w-full rounded-md bg-gray-900 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 sm:w-auto sm:px-8"
          >
            {added ? 'Added!' : 'Add to cart'}
          </button>
        </div>
      </div>
    </main>
  )
}
