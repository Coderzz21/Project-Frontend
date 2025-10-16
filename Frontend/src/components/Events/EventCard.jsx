import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Users } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      conference: 'bg-blue-100 text-blue-800',
      workshop: 'bg-green-100 text-green-800',
      concert: 'bg-purple-100 text-purple-800',
      sports: 'bg-orange-100 text-orange-800',
      festival: 'bg-pink-100 text-pink-800',
      seminar: 'bg-indigo-100 text-indigo-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="card-hover animate-fade-in">
      {/* Event Image */}
      <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <Calendar className="h-16 w-16 text-white opacity-50" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`badge ${getCategoryColor(event.category)} capitalize`}>
            {event.category}
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-2" />
              <span>{event.availableSeats || event.capacity} seats left</span>
            </div>
            
            <div className="flex items-center text-lg font-bold text-blue-600">
              <DollarSign className="h-5 w-5" />
              <span>{event.price === 0 ? 'Free' : event.price}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/events/${event._id}`}
          className="w-full btn-primary text-center block hover:scale-105 transform transition-transform duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;