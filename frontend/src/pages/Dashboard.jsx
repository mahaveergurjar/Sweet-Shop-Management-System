import React, { useEffect, useState } from "react";
import { sweetService } from "../services/api";
import { SweetCard } from "../components/SweetCard";
import { SearchBar } from "../components/SearchBar";

export const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetService.getAll();
      setSweets(data);
      setFilteredSweets(data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      if (Object.keys(filters).length === 0) {
        setFilteredSweets(sweets);
      } else {
        const results = await sweetService.search(filters);
        setFilteredSweets(results);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading && sweets.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              🍬
            </div>
          </div>
          <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium animate-pulse">
            Gathering delicious sweets...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
          Our Sweet Collection
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-xl max-w-2xl mx-auto">
          Handcrafted treats delivered right to your doorstep. Satisfy your
          cravings today!
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-xl mb-10 flex items-center gap-3 animate-shake">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-medium">{error}</span>
        </div>
      )}

      {filteredSweets.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 dark:bg-gray-800/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <div className="text-8xl mb-6 grayscale opacity-50">🍭</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            No sweets match your search
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try using different keywords or clearing your filters.
          </p>
          <button
            onClick={() => handleSearch({})}
            className="mt-6 text-primary-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSweets.map((sweet) => (
            <SweetCard key={sweet.id} sweet={sweet} />
          ))}
        </div>
      )}
    </div>
  );
};
