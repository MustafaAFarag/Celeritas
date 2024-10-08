import { FormEvent, useState } from 'react';
import { useOutSideClick } from '../../hooks/useOutsideClick';

interface PaymentFormProps {
  totalPrice: number;
  onClose: () => void; // For closing the modal
  onSubmit: () => void; // New prop for handling submission
}

function PaymentForm({ totalPrice, onClose, onSubmit }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [nameOnCard, setNameOnCard] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');

  // Use the hook to close the modal on outside click
  const modalRef = useOutSideClick(() => {
    onClose();
  });

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Optionally add payment validation here

    // Call the onSubmit function to handle the actual form submission
    onSubmit();

    // Close the modal after successful payment
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
      >
        <form onSubmit={handlePaymentSubmit}>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                Card Number:
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="mt-1 w-full rounded-lg border-gray-300 p-3 text-black focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                Expiry Date (MM/YY):
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="mt-1 w-full rounded-lg border-gray-300 p-3 text-black focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                Name on Card:
              </label>
              <input
                type="text"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                className="mt-1 w-full rounded-lg border-gray-300 p-3 text-black focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                CVV:
              </label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="mt-1 w-full rounded-lg border-gray-300 p-3 text-black focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                required
              />
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Total: ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-primary px-6 py-3 text-xl font-medium text-white shadow-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
