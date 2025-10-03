import { getAllBookings } from './bookingsService';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAnalytics = async () => {
  await delay(1000);
  
  const bookings = await getAllBookings();
  const activeBookings = bookings.filter(b => b.status === 'booked');
  
  // Mock analytics data
  return {
    totalBookings: activeBookings.length,
    totalRevenue: activeBookings.reduce((sum, booking) => sum + (booking.totalAmount || 299), 0),
    totalEvents: 4, // Mock events count
    popularEvents: [
      { eventId: '1', title: 'Tech Conference 2025', bookings: 45 },
      { eventId: '2', title: 'Music Festival Summer', bookings: 38 },
      { eventId: '3', title: 'Business Summit', bookings: 32 },
    ],
  };
};

export const exportBookings = async (format) => {
  await delay(1500);
  
  const bookings = await getAllBookings();
  
  if (format === 'csv') {
    // Generate CSV content
    const csvContent = [
      'Booking ID,User ID,Event ID,Seats,Status,Created At,Total Amount',
      ...bookings.map(booking => 
        `${booking._id},${booking.userId},${booking.eventId},${booking.seats},${booking.status},${booking.createdAt},${booking.totalAmount || 299}`
      )
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  return { success: true, message: `${format.toUpperCase()} export completed` };
};
