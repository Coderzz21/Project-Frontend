import React, { useState, useEffect } from 'react';
import { generateQRCode, generateTicketData } from '../../utils/qrGenerator';
import { Download, QrCode, Calendar, MapPin, User as UserIcon, Hash } from 'lucide-react';
import html2canvas from 'html2canvas';

const TicketDownload = ({ booking, event, user }) => {
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);

  const generateTicket = async () => {
    setLoading(true);
    try {
      const ticketData = generateTicketData(booking, event, user);
      const qrCodeUrl = await generateQRCode(ticketData);
      setQrCode(qrCodeUrl);
    } catch (error) {
      alert('Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const downloadTicket = async () => {
    if (!qrCode) return;

    const ticketElement = document.getElementById('ticket-content');
    if (!ticketElement) return;

    try {
      const canvas = await html2canvas(ticketElement);
      const link = document.createElement('a');
      link.download = `ticket-${booking.ticketCode}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      alert('Failed to download ticket');
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

  useEffect(() => {
    generateTicket();
  }, [booking, event, user]);

  return (
    <div className="max-w-md mx-auto">
      <div
        id="ticket-content"
        className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg text-white shadow-lg"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">EventHub</h2>
          <p className="text-blue-100">Digital Ticket</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
          <h3 className="text-xl font-bold mb-3">{event?.title || 'Event'}</h3>

          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {event?.date ? formatDate(event.date) : 'Date TBD'}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {event?.location || 'Location TBD'}
            </div>
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-2" />
              {user?.name || 'Guest'}
            </div>
            <div className="flex items-center">
              <Hash className="h-4 w-4 mr-2" />
              {booking.seats} seat{booking.seats > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="text-center">
          {qrCode ? (
            <img
              src={qrCode}
              alt="Ticket QR Code"
              className="mx-auto mb-4 bg-white p-2 rounded-lg"
              style={{ width: '120px', height: '120px' }}
            />
          ) : (
            <div className="mx-auto mb-4 bg-white/20 p-8 rounded-lg flex items-center justify-center">
              <QrCode className="h-16 w-16 text-white/60" />
            </div>
          )}

          <p className="text-xs text-blue-100 mb-2">
            Ticket Code: {booking.ticketCode}
          </p>
          <p className="text-xs text-blue-100">
            Show this QR code at the event entrance
          </p>
        </div>
      </div>

      {qrCode && (
        <button
          onClick={downloadTicket}
          className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Ticket
        </button>
      )}
    </div>
  );
};

export default TicketDownload;
