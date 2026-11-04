import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold tracking-tight text-gray-900">
          Fieldstore
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            Shop
          </Link>
          <Link to="/cart" className="relative text-sm text-gray-600 hover:text-gray-900">
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-4 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-xs font-medium text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
