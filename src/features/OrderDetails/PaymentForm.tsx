import { useState } from 'react';

interface PaymentFormProps {
  totalPrice: number;
  onClose: () => void; // For closing the modal
  onSubmit: () => void; // New prop for handling submission
}

function PaymentForm({ totalPrice, onClose, onSubmit }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [NameOnCard, setNameOnCard] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Optionally add payment validation here

    // Call the onSubmit function to handle the actual form submission
    onSubmit();

    // Close the modal after successful payment
    onClose();
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Card Number:
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="mt-1 w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Expiry Date:
          </label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="mt-1 w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
            placeholder="MM/YY"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Name on Card:
          </label>
          <input
            type="text"
            value={NameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            className="mt-1 w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
            placeholder="MM/YY"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            CVV:
          </label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="mt-1 w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
            placeholder="123"
            required
          />
        </div>
      </div>

      <div className="mt-6 text-lg font-semibold">
        Total Price: ${totalPrice}
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-green-500 px-6 py-3 text-lg font-medium text-white shadow-md transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Confirm Payment
      </button>
    </form>
  );
}

export default PaymentForm;
