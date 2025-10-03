import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, Calendar, MapPin, DollarSign, X } from 'lucide-react';
import { fetchEvents, setFilters, clearFilters } from '../redux/slices/eventSlice';
import EventCard from '../components/Events/EventCard';

const Events = () => {
  const dispatch = useDispatch();
  const { events, isLoading, filters, pagination } = useSelector((state) => state.events);
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    dispatch(fetchEvents({ ...filters, page: 1 }));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    setLocalFilters({ ...localFilters, [key]: value });
  };

  const applyFilters = () => {
    dispatch(setFilters(localFilters));
    setShowFilters(false);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      category: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      date: '',
      search: '',
    };
    setLocalFilters(emptyFilters);
    dispatch(clearFilters());
  };

  const loadMore = () => {
    const nextPage = pagination.currentPage + 1;
    if (nextPage <= pagination.totalPages) {
      dispatch(fetchEvents({ ...filters, page: nextPage }));
    }
  };

  const categories = [
    'conference',
    'workshop',
    'concert',
    'sports',
    'festival',
    'seminar',
    'other'
  ];

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing Events
        </h1>
        <p className="text-gray-600 text-lg">
          Find the perfect events that match your interests and schedule.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={localFilters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 btn-secondary"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {Object.values(filters).filter(value => value !== '').length}
              </span>
            )}
          </button>

          {/* Apply Search */}
          <button
            onClick={applyFilters}
            className="btn-primary"
          >
            Search
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={localFilters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={localFilters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={localFilters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={localFilters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={localFilters.date}
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={clearAllFilters}
                className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-1"
              >
                <X className="h-4 w-4" />
                <span>Clear All Filters</span>
              </button>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowFilters(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={applyFilters}
                  className="btn-primary"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          {isLoading ? (
            'Loading events...'
          ) : (
            `Showing ${events.length} of ${pagination.total} events`
          )}
        </p>
        
        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {key}: {value}
                  <button
                    onClick={() => {
                      const newFilters = { ...localFilters, [key]: '' };
                      setLocalFilters(newFilters);
                      dispatch(setFilters(newFilters));
                    }}
                    className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Events Grid */}
      {isLoading && events.length === 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : events.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>

          {/* Load More Button */}
          {pagination.currentPage < pagination.totalPages && (
            <div className="text-center">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Load More Events'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎪</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            No Events Found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any events matching your criteria.
          </p>
          <button
            onClick={clearAllFilters}
            className="btn-primary"
          >
            View All Events
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;