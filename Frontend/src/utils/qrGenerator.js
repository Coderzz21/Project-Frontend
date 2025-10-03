import QRCode from 'qrcode';

export const generateQRCode = async (data) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 256
    });
    return qrCodeDataUrl;
  } catch (err) {
    throw new Error('Failed to generate QR code');
  }
};

export const generateTicketData = (booking, event, user) => {
  return JSON.stringify({
    bookingId: booking._id,
    eventTitle: event?.title || 'Unknown Event',
    eventDate: event?.date || new Date().toISOString(),
    eventLocation: event?.location || 'Unknown Location',
    userName: user?.name || 'Unknown User',
    seats: booking.seats,
    ticketCode: booking.ticketCode,
    validatedAt: null,
  });
};
