import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBooking } from '../../store/slices/bookingsSlice';
import { CreditCard, Users, Calendar, MapPin, DollarSign } from 'lucide-react';

const BookingForm = ({ event, onSuccess, onCancel }) => {
  const [seats, setSeats] = useState(1);
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });
  const [processing, setProcessing] = useState(false);

  const dispatch = useDispatch();

  const availableSeats = event.capacity - event.bookings.length;
  const totalAmount = event.price * seats;

  const handlePaymentFormChange = (e) => {
    setPaymentForm({
      ...paymentForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!paymentStep) {
      setPaymentStep(true);
      return;
    }

    setProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await dispatch(createBooking({ eventId: event._id, seats }));

      alert('Booking successful! Check your email for confirmation.');
      onSuccess();
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setProcessing(false);
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

  if (!paymentStep) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Event</h2>

        {/* Event Summary */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">{event.title}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-blue-500" />
              {event.location}
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
              ${event.price} per seat
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-500" />
              {availableSeats} seats available
            </div>
          </div>
        </div>

        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Seats
            </label>
            <select
              value={seats}
              onChange={(e) => setSeats(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[...Array(Math.min(10, availableSeats))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} seat{i > 0 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-blue-600">${totalAmount}</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <CreditCard className="h-6 w-6 mr-2 text-blue-600" />
        Payment Details
      </h2>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="font-medium">{event.title}</span>
          <span className="text-blue-600 font-bold">${totalAmount}</span>
        </div>
        <p className="text-sm text-gray-600">
          {seats} seat{seats > 1 ? 's' : ''}
        </p>
      </div>

      <form onSubmit={handleBookingSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            name="name"
            value={paymentForm.name}
            onChange={handlePaymentFormChange}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            value={paymentForm.cardNumber}
            onChange={handlePaymentFormChange}
            placeholder="4242 4242 4242 4242"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiryDate"
              value={paymentForm.expiryDate}
              onChange={handlePaymentFormChange}
              placeholder="MM/YY"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={paymentForm.cvv}
              onChange={handlePaymentFormChange}
              placeholder="123"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setPaymentStep(false)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={processing}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={processing}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? 'Processing...' : `Pay $${totalAmount}`}
          </button>
        </div>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Secure payment powered by Stripe (Test Mode)
      </p>
    </div>
  );
};

export default BookingForm;
