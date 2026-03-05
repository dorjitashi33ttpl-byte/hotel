import React, { useState } from 'react';

interface BookingFlowProps {
  hotelId: number;
  roomTypeId: number;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ hotelId, roomTypeId }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const handleHold = async () => {
    setStep(2);
  };

  const handleConfirm = async () => {
    setStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
              {s}
            </div>
            <span className={`text-xs font-bold ${step >= s ? 'text-blue-600' : 'text-gray-400'}`}>
              {s === 1 ? 'Booking Details' : s === 2 ? 'Payment' : 'Confirmation'}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Complete your booking</h2>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Thimphu Heritage Lodge</h3>
            <p className="text-gray-500 mb-4">Deluxe Room • 2 Guests • 3 Nights</p>
            <div className="flex justify-between font-bold text-xl text-blue-600 border-t pt-4">
              <span>Total Amount</span>
              <span>BTN 15,000</span>
            </div>
          </div>
          <button onClick={handleHold} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200">
            Proceed to Payment
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
          <div className="grid grid-cols-2 gap-4">
            {['stripe', 'razorpay', 'local_bank', 'cash'].map(m => (
              <button
                key={m}
                onClick={() => setPaymentMethod(m)}
                className={`p-6 border-2 rounded-xl text-left transition-all ${paymentMethod === m ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
              >
                <p className="font-bold capitalize">{m.replace('_', ' ')}</p>
                <p className="text-sm text-gray-500">{m === 'stripe' ? 'Visa, Mastercard, Amex' : m === 'cash' ? 'Pay on arrival' : 'Bank Transfer'}</p>
              </button>
            ))}
          </div>
          <button onClick={handleConfirm} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200">
            Confirm & Pay
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-8 px-4 text-lg">Your reservation in Bhutan is ready. We've sent a confirmation email to you and the hotel staff.</p>
          <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all">View My Bookings</button>
        </div>
      )}
    </div>
  );
};
