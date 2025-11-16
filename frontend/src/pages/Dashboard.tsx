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
        <div className="text-center">Loading sweets...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary-600">
        🍬 Our Sweet Collection
      </h1>

      <SearchBar onSearch={handleSearch} />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {filteredSweets.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">No sweets found</p>
          <p className="mt-2">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSweets.map((sweet) => (
            <SweetCard key={sweet.id} sweet={sweet} onPurchase={handlePurchase} />
          ))}
        </div>
      )}
    </div>
  );
};

