import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const emptyForm = { name: '', email: '', address: '', city: '', zip: '' }

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [placed, setPlaced] = useState(false)

  if (items.length === 0 && !placed) {
    return <Navigate to="/cart" replace />
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Order placed!</h1>
        <p className="mt-2 text-gray-500">
          Thanks, {form.name || 'friend'}. This is a demo store, so no real order was submitted.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 rounded-md bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
        >
          Continue shopping
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Checkout</h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Full name" name="name" value={form.name} onChange={handleChange} required />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Field label="Address" name="address" value={form.address} onChange={handleChange} required />
          <div className="grid grid-cols-2 gap-4">
            <Field label="City" name="city" value={form.city} onChange={handleChange} required />
            <Field label="ZIP code" name="zip" value={form.zip} onChange={handleChange} required />
          </div>
          <p className="text-xs text-gray-400">
            This is a demo checkout — no payment is collected and no order is actually sent anywhere.
          </p>
          <button
            type="submit"
            className="mt-2 rounded-md bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-700"
          >
            Place order · ${subtotal.toFixed(2)}
          </button>
        </form>

        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Order summary</h2>
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} × {item.quantity}
                </span>
                <span className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-semibold text-gray-900">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Link to="/cart" className="mt-6 inline-block text-sm text-gray-500 hover:text-gray-900">
        &larr; Back to cart
      </Link>
    </main>
  )
}

function Field({ label, name, type = 'text', value, onChange, required }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-gray-600">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
      />
    </label>
  )
}
