import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings, cancelBooking } from '../../store/slices/bookingsSlice';
import { fetchEventById } from '../../store/slices/eventsSlice';
import TicketDownload from '../../components/Bookings/TicketDownload';
import { Calendar, MapPin, Ticket, X, QrCode } from 'lucide-react';

const UserBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.bookings);
  const { user } = useSelector((state) => state.auth);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [events, setEvents] = useState({});

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchUserBookings(user._id));
    }
  }, [dispatch, user]);

  // Mock events data for demo (replace with real API in production)
  useEffect(() => {
    const mockEvents = {
      '1': {
        _id: '1',
        title: 'Tech Conference 2025',
        date: '2025-03-15T09:00:00.000Z',
        location: 'San Francisco, CA',
        imageUrl:
          'https://images.pexels.com/photos/1552617/pexels-photo-1552617.jpeg',
        category: 'Technology',
      },
      '2': {
        _id: '2',
        title: 'Music Festival Summer',
        date: '2025-07-20T18:00:00.000Z',
        location: 'Austin, TX',
        imageUrl:
          'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
        category: 'Music',
      },
    };
    setEvents(mockEvents);
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      await dispatch(cancelBooking(bookingId));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (selectedBooking) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Download Ticket</h1>
            <button
              onClick={() => setSelectedBooking(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="h-5 w-5 mr-2" />
              Close
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <TicketDownload
              booking={selectedBooking}
              event={events[selectedBooking.eventId]}
              user={user}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your event tickets and bookings</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't booked any events yet. Discover amazing events and book your tickets.
            </p>
            <a
              href="/events"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Browse Events
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => {
              const event = events[booking.eventId];
              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={
                        event?.imageUrl ||
                        'https://images.pexels.com/photos/1552617/pexels-photo-1552617.jpeg'
                      }
                      alt={event?.title || 'Event'}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === 'booked'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status === 'booked' ? 'Confirmed' : 'Cancelled'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event?.title || 'Event'}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        {event?.date ? formatDate(event.date) : 'Date TBD'}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        {event?.location || 'Location TBD'}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Ticket className="h-4 w-4 mr-2 text-blue-500" />
                        {booking.seats} seat{booking.seats > 1 ? 's' : ''}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">Booking ID:</span>
                        <span className="text-sm font-mono text-gray-900">
                          {booking.ticketCode}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        {booking.status === 'booked' && (
                          <>
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                            >
                              <QrCode className="h-4 w-4 mr-2" />
                              View Ticket
                            </button>
                            <button
                              onClick={() => handleCancelBooking(booking._id)}
                              className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        {booking.status === 'cancelled' && (
                          <div className="w-full text-center text-gray-500 text-sm py-2">
                            This booking has been cancelled
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
