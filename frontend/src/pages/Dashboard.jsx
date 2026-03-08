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
            <div className="absolute inset-0 flex items-center justify-center text-primary-600">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 5v14l8 3 8-3V5l-8-3zm0 2.18L18.15 6.5 12 8.82 5.85 6.5 12 4.18zM6 8.58l5 1.88v9.36l-5-1.88V8.58zm7 11.24V10.46l5-1.88v9.36l-5 1.88z" />
              </svg>
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
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative pt-36 pb-32 overflow-hidden">
        {/* Traditional Palace Arch Frame */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.08]">
          <svg
            className="w-full h-full max-w-5xl"
            viewBox="0 0 1000 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 800V400C100 179.086 279.086 0 500 0C720.914 0 900 179.086 900 400V800"
              stroke="#FFC107"
              strokeWidth="4"
            />
            <path
              d="M150 800V400C150 206.7 306.7 50 500 50C693.3 50 850 206.7 850 400V800"
              stroke="#FFC107"
              strokeWidth="2"
              strokeDasharray="10 10"
            />
            {/* Decorative Pillars */}
            <rect
              x="80"
              y="400"
              width="40"
              height="400"
              fill="#FFC107"
              opacity="0.5"
            />
            <rect
              x="880"
              y="400"
              width="40"
              height="400"
              fill="#FFC107"
              opacity="0.5"
            />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary-50/80 backdrop-blur-sm border border-primary-100 mb-10 transform hover:scale-105 transition-transform cursor-default shadow-sm animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping"></span>
            <span className="text-[10px] font-black text-primary-700 uppercase tracking-[0.3em]">
              Legacy of Authentic Indian Mithai
            </span>
          </div>

          <h1
            className="text-6xl md:text-8xl font-serif font-black mb-8 text-royal-chocolate leading-[1.1] animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            Experience the <br />
            <span className="text-primary-500 italic">Royal Taste</span>
          </h1>

          <p
            className="text-gray-600 text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12 animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
          >
            Handcrafted with devotion, using centuries-old recipes and the
            purest ingredients for your celebrations.
          </p>

          <div
            className="flex items-center justify-center gap-8 animate-fadeIn"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-primary-400 rotate-45 border border-primary-600/20 shadow-sm"
                ></div>
              ))}
            </div>
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-1 relative z-20">
        {/* Decorative Paisley Divider */}
        <div className="flex justify-center mb-16 opacity-30">
          <svg
            className="w-32 h-16"
            viewBox="0 0 100 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 10C60 10 70 20 70 30C70 40 60 45 50 45C40 45 30 40 30 30C30 20 40 10 50 10Z"
              stroke="#FFC107"
              strokeWidth="1"
            />
            <path
              d="M50 15C55 15 60 20 60 25C60 30 55 35 50 35C45 35 40 30 40 25C40 20 45 15 50 15Z"
              fill="#FFC107"
            />
            <path
              d="M20 25Q35 0 50 25T80 25"
              stroke="#FFC107"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
          </svg>
        </div>

        <div className="mb-16">
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 px-8 py-5 rounded-2xl mb-12 flex items-center gap-4 shadow-sm animate-shake">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-bold tracking-tight">{error}</span>
          </div>
        )}

        {filteredSweets.length === 0 ? (
          <div className="text-center py-32 bg-white/40 backdrop-blur-sm rounded-[2rem] border-2 border-dashed border-primary-200 shadow-sm">
            <h3 className="text-3xl font-serif font-black text-royal-chocolate mb-4">
              Finding sweets for you...
            </h3>
            <p className="text-gray-500 font-medium">
              We couldn't find any sweets matching your selection.
            </p>
            <button
              onClick={() => handleSearch({})}
              className="mt-10 bg-primary-500 text-white px-10 py-3 rounded-full font-bold hover:bg-primary-600 transition-all shadow-md hover:shadow-lg"
            >
              Expose All Delicacies
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredSweets.map((sweet) => (
              <SweetCard key={sweet.id} sweet={sweet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
