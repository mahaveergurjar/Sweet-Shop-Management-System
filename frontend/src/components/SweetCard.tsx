import { Sweet } from '../types';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (id: number) => void;
}

export const SweetCard = ({ sweet, onPurchase }: SweetCardProps) => {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 pr-2">{sweet.name}</h3>
          <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
            {sweet.category}
          </span>
        </div>
        <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">₹{sweet.price.toFixed(2)}</p>
        <div className="flex justify-between items-center mb-5">
          <span className={`text-sm font-medium flex items-center gap-1 ${
            isOutOfStock 
              ? 'text-red-600 dark:text-red-400' 
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {isOutOfStock ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Out of Stock
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {sweet.quantity} in stock
              </>
            )}
          </span>
        </div>
        <button
          onClick={() => onPurchase(sweet.id)}
          disabled={isOutOfStock}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            isOutOfStock
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart 🛒'}
        </button>
      </div>
    </div>
  );
};

