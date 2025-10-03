import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById, clearCurrentEvent } from '../../store/slices/eventsSlice';
import BookingForm from '../../components/Bookings/BookingForm';
import { Calendar, MapPin, Users, DollarSign, Clock, ArrowLeft, Ticket } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams(); // no generic typing
  const dispatch = useDispatch();
  const { currentEvent: event, loading } = useSelector((state) => state.events);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }

    return () => {
      dispatch(clearCurrentEvent());
    };
  }, [dispatch, id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    if (id) {
      dispatch(fetchEventById(id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event not found</h2>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <Link
            to="/events"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const availableSeats = event.capacity - event.bookings.length;
  const { date, time } = formatDate(event.date);

  if (showBookingForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button
              onClick={() => setShowBookingForm(false)}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Event Details
            </button>
          </div>

          <BookingForm
            event={event}
            onSuccess={handleBookingSuccess}
            onCancel={() => setShowBookingForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-16">
          <div className="text-white">
            <Link
              to="/events"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Events
            </Link>

            <div className="mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
            <p className="text-xl text-white/90 max-w-3xl">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Date & Time</h3>
                    <p className="text-gray-600">{date}</p>
                    <p className="text-gray-600">{time}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Capacity</h3>
                    <p className="text-gray-600">{availableSeats} seats available</p>
                    <p className="text-sm text-gray-500">Total capacity: {event.capacity}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <DollarSign className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Price</h3>
                    <p className="text-2xl font-bold text-green-600">${event.price}</p>
                    <p className="text-sm text-gray-500">per ticket</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h3>
                <div className="prose max-w-none text-gray-600">
                  <p className="mb-4">{event.description}</p>
                  <p className="mb-4">
                    Join us for an unforgettable experience that brings together the best in {event.category.toLowerCase()}.
                    This event promises to deliver exceptional value and memorable moments for all attendees.
                  </p>
                  <p>
                    Don't miss out on this opportunity to be part of something special.
                    Book your tickets now and secure your spot at {event.title}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">${event.price}</div>
                <p className="text-gray-600">per ticket</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Available Seats:</span>
                  <span className="font-medium text-gray-900">{availableSeats}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Event Status:</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>

              {isAuthenticated ? (
                <button
                  onClick={() => setShowBookingForm(true)}
                  disabled={availableSeats === 0}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Ticket className="h-5 w-5 mr-2" />
                  {availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-center text-gray-600 text-sm">
                    You need to log in to book tickets
                  </p>
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
                    >
                      Sign In to Book
                    </Link>
                    <Link
                      to="/register"
                      className="w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium text-center block"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  Instant confirmation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
