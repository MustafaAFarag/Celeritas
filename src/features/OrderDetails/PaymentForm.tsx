import { FormEvent, useState } from 'react';
import { useOutSideClick } from '../../hooks/useOutsideClick';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcDinersClub,
  FaCcJcb,
  FaCcPaypal, // PayPal icon
  FaApplePay, // Apple Pay icon
  FaGooglePay, // Google Pay icon
} from 'react-icons/fa';

interface PaymentFormProps {
  totalPrice: number;
  onClose: () => void;
  onSubmit: () => void;
}

function PaymentForm({ totalPrice, onClose, onSubmit }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [nameOnCard, setNameOnCard] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');

  const modalRef = useOutSideClick(() => {
    onClose();
  });

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Payment validation logic can be added here

    onSubmit();
    onClose();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16); // Allow only digits and limit to 16
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim(); // Add space after every 4 digits
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4); // Allow only digits and limit to 4
    const formattedValue = value.replace(/(\d{2})(\d+)/, '$1/$2'); // Add slash after 2 digits
    setExpiryDate(formattedValue);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="flex w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
      >
        {/* Payment Form Section */}
        <div className="w-full border-r-2 p-4">
          <form onSubmit={handlePaymentSubmit}>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Payment Details
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                  Card Number:
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="mt-1 w-full rounded-lg border-2 p-3 text-black shadow-sm dark:border-gray-600"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19} // Allow for spaces
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Expiry Date (MM/YY):
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    className="mt-1 w-full rounded-lg border-2 p-3 text-black shadow-sm dark:border-gray-600"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    CVV:
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="mt-1 w-full rounded-lg border-2 p-3 text-black shadow-sm dark:border-gray-600"
                    placeholder="123"
                    maxLength={3}
                    pattern="\d{3}"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                  Name on Card:
                </label>
                <input
                  type="text"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="mt-1 w-full rounded-lg border-2 p-3 text-black shadow-sm dark:border-gray-600"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mt-4 flex justify-between">
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

        {/* Supported Payment Methods Section */}
        <div className="ml-8 w-1/2">
          <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
            We Accept:
          </h3>
          <div className="grid grid-cols-4 gap-6">
            <FaCcVisa className="h-12 w-12 text-blue-600" />
            <FaCcMastercard className="h-12 w-12 text-red-600" />
            <FaCcAmex className="h-12 w-12 text-blue-500" />
            <FaCcDiscover className="h-12 w-12 text-orange-600" />
            <FaCcDinersClub className="h-12 w-12 text-blue-400" />
            <FaCcJcb className="h-12 w-12 text-green-600" />
            <FaCcPaypal className="h-12 w-12 text-blue-700" />
            <FaApplePay className="h-12 w-12 text-black" />
            <FaGooglePay className="h-12 w-12 text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
