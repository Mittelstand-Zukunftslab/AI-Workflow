import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <Link to={`/product/${product.id}`} className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs uppercase tracking-wide text-gray-400">{product.category}</p>
        <Link to={`/product/${product.id}`} className="font-medium text-gray-900 hover:underline">
          {product.name}
        </Link>
        <p className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addItem(product)}
            className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            Add to cart
          </button>
        </p>
      </div>
    </div>
  )
}
