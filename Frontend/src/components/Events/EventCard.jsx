import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const availableSeats = event.capacity - event.bookings.length;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {event.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
            ${event.price}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            {event.location}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="h-4 w-4 mr-2 text-blue-500" />
            {availableSeats} seats available
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-green-600 font-bold">
            <DollarSign className="h-5 w-5 mr-1" />
            {event.price}
          </div>

          <Link
            to={`/events/${event._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
