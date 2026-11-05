import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Your cart is empty</h1>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-gray-900 underline">
          Continue shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Your cart</h1>
      <ul className="divide-y divide-gray-200 border-y border-gray-200">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 py-4">
            <img src={item.image} alt={item.name} className="h-20 w-20 rounded-md object-cover" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center rounded-md border border-gray-300">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-3 py-1.5 text-gray-600 hover:text-gray-900"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1.5 text-gray-600 hover:text-gray-900"
              >
                +
              </button>
            </div>
            <p className="w-20 text-right font-medium text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeItem(item.id)}
              className="text-sm text-gray-400 hover:text-red-600"
              aria-label={`Remove ${item.name}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col items-end gap-4">
        <p className="text-lg font-semibold text-gray-900">Subtotal: ${subtotal.toFixed(2)}</p>
        <button
          onClick={() => navigate('/checkout')}
          className="rounded-md bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-700"
        >
          Proceed to checkout
        </button>
      </div>
    </main>
  )
}
