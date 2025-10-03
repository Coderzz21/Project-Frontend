// User object example
// {
//   _id: 'string',
//   name: 'string',
//   email: 'string',
//   role: 'user' or 'admin',
//   bookings: ['bookingId1', 'bookingId2'],
//   createdAt: 'ISO string'
// }

// Event object example
// {
//   _id: 'string',
//   title: 'string',
//   description: 'string',
//   date: 'ISO string',
//   location: 'string',
//   capacity: number,
//   price: number,
//   bookings: ['bookingId1', 'bookingId2'],
//   imageUrl: 'string',
//   category: 'string',
//   status: 'active' or 'cancelled'
// }

// Booking object example
// {
//   _id: 'string',
//   userId: 'string',
//   eventId: 'string',
//   seats: number,
//   status: 'booked' or 'cancelled',
//   createdAt: 'ISO string',
//   ticketCode: 'string',
//   totalAmount: number
// }

// Redux state examples:

// AuthState
const authState = {
  user: null, // or a User object
  token: null,
  isAuthenticated: false,
  loading: false,
};

// EventsState
const eventsState = {
  events: [], // array of Event objects
  currentEvent: null, // a single Event object
  loading: false,
  searchTerm: '',
  filters: {
    category: '',
    location: '',
    priceRange: [0, 1000],
    date: '',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalEvents: 0,
  },
};

// BookingsState
const bookingsState = {
  bookings: [], // array of Booking objects
  loading: false,
};

// AdminState
const adminState = {
  analytics: {
    totalBookings: 0,
    totalRevenue: 0,
    totalEvents: 0,
    popularEvents: [], // array of { eventId, title, bookings }
  },
  loading: false,
};
