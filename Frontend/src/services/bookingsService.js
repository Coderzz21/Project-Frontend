// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock bookings data
let MOCK_BOOKINGS = [];

export const createBooking = async (bookingData) => {
  await delay(1000);
  
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }
  
  // Extract user ID from token
  const userId = token.split('_')[1];
  
  const newBooking = {
    _id: `booking_${Date.now()}`,
    userId,
    eventId: bookingData.eventId,
    seats: bookingData.seats,
    status: 'booked',
    createdAt: new Date().toISOString(),
    ticketCode: `TICKET_${Date.now()}`,
    totalAmount: 0, // Would be calculated based on event price
  };
  
  MOCK_BOOKINGS.push(newBooking);
  return newBooking;
};

export const getUserBookings = async (userId) => {
  await delay(500);
  return MOCK_BOOKINGS.filter(booking => booking.userId === userId);
};

export const cancelBooking = async (bookingId) => {
  await delay(500);
  
  const booking = MOCK_BOOKINGS.find(b => b._id === bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }
  
  // In real app, would update database
  booking.status = 'cancelled';
};

export const getAllBookings = async () => {
  await delay(500);
  return MOCK_BOOKINGS;
};
