import { Sweet } from '../types';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (id: number) => void;
}

export const SweetCard = ({ sweet, onPurchase }: SweetCardProps) => {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{sweet.name}</h3>
          <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2 py-1 rounded">
            {sweet.category}
          </span>
        </div>
        <p className="text-2xl font-bold text-primary-600 mb-4">₹{sweet.price.toFixed(2)}</p>
        <div className="flex justify-between items-center mb-4">
          <span className={`text-sm ${isOutOfStock ? 'text-red-600' : 'text-gray-600'}`}>
            {isOutOfStock ? 'Out of Stock' : `${sweet.quantity} in stock`}
          </span>
        </div>
        <button
          onClick={() => onPurchase(sweet.id)}
          disabled={isOutOfStock}
          className={`w-full py-2 px-4 rounded-md font-semibold transition ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Purchase'}
        </button>
      </div>
    </div>
  );
};

