import React, { useState } from "react";

export const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    name: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    const cleared = { name: "", category: "" };
    setFilters(cleared);
    onSearch(cleared);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-premium p-10 border border-primary-50 animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
            Search Delicacy
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="e.g. Kaju Katli..."
              className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary-500 transition-all outline-none font-medium text-gray-700 placeholder:text-gray-300"
            />
            <svg
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="lg:w-64 space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">
            Category
          </label>
          <div className="relative">
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary-500 transition-all outline-none font-bold text-gray-600 appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="Sweets">Sweets</option>
              <option value="Snacks">Snacks</option>
              <option value="Festive">Festive Specials</option>
            </select>
            <svg
              className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-end gap-3">
          <button
            onClick={handleClear}
            className="px-6 py-4 rounded-2xl font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
          >
            Clear
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 lg:flex-none bg-primary-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-md hover:shadow-lg transform active:scale-95"
          >
            Find Sweets
          </button>
        </div>
      </div>
    </div>
  );
};
