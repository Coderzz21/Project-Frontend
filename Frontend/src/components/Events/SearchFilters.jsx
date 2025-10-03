import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setFilters } from '../../store/slices/eventsSlice';
import { Search, Filter, X } from 'lucide-react';

const SearchFilters = () => {
  const { searchTerm, filters } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const categories = ['Technology', 'Music', 'Business', 'Arts', 'Sports', 'Food'];
  const locations = ['San Francisco, CA', 'Austin, TX', 'New York, NY', 'Los Angeles, CA', 'Chicago, IL'];

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const clearFilters = () => {
    dispatch(setSearchTerm(''));
    dispatch(
      setFilters({
        category: '',
        location: '',
        priceRange: [0, 1000],
        date: '',
      })
    );
  };

  const hasActiveFilters =
    Boolean(searchTerm) || Boolean(filters.category) || Boolean(filters.location) || Boolean(filters.date);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-blue-600" />
          Search & Filter Events
        </h3>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center text-gray-500 hover:text-red-600 transition-colors text-sm"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Location Filter */}
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* Date Filter */}
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Price Range */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          value={filters.priceRange[1]}
          onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SearchFilters;
