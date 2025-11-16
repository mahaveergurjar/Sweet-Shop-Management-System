import { useEffect, useState } from 'react';
import { sweetService } from '../services/api';
import { Sweet, SearchFilters } from '../types';
import { SweetCard } from '../components/SweetCard';
import { SearchBar } from '../components/SearchBar';

export const Dashboard = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetService.getAll();
      setSweets(data);
      setFilteredSweets(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters: SearchFilters) => {
    try {
      setLoading(true);
      if (Object.keys(filters).length === 0) {
        setFilteredSweets(sweets);
      } else {
        const results = await sweetService.search(filters);
        setFilteredSweets(results);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id: number) => {
    try {
      await sweetService.purchase(id, 1);
      await loadSweets(); // Reload to get updated quantities
    } catch (err: any) {
      alert(err.response?.data?.error || 'Purchase failed');
    }
  };

  if (loading && sweets.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading sweets...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-3 text-primary-600 dark:text-primary-400">
          🍬 Our Sweet Collection
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Discover our delicious range of sweets
        </p>
      </div>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {filteredSweets.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍭</div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No sweets found</p>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSweets.map((sweet) => (
            <SweetCard key={sweet.id} sweet={sweet} onPurchase={handlePurchase} />
          ))}
        </div>
      )}
    </div>
  );
};

