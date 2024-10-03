import { FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import PaymentForm from '../features/OrderDetails/PaymentForm';
import Modal from '../ui/Modal';

function OrderDetails() {
  const { user } = useUser();
  const location = useLocation();
  const [fullName, setFullName] = useState<string>(user?.full_name ?? '');
  const [phoneNumber, setPhoneNumber] = useState<string>('01294790041');
  const [address, setAddress] = useState<string>('Alexandria, Egypt');
  const [isPriority, setIsPriority] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card'); // Default payment method

  const baseTotalPrice = location.state?.totalPrice || 0;
  const totalPrice = isPriority ? baseTotalPrice + 25 : baseTotalPrice;

  const handleOrderSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Open modal if payment is by Credit Card
    if (paymentMethod === 'Credit Card') {
      setIsModalOpen(true);
    } else {
      // Handle order submission without modal (e.g., for Cash on Delivery)
      // Here, you might want to add logic to finalize the order.
      alert('Order submitted successfully! (Cash on Delivery)');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Order Details
        </h1>
        <form onSubmit={handleOrderSubmit} className="space-y-6">
          {/* Existing form fields */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Full Name:
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Phone Number:
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Address:
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isPriority}
              onChange={(e) => setIsPriority(e.target.checked)}
              className="h-5 w-5 border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <label className="text-lg font-medium text-gray-700">
              Priority Order (+$25)
            </label>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Payment Method:
            </label>
            <div className="mt-2 flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Credit Card"
                  checked={paymentMethod === 'Credit Card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-5 w-5 border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span>Credit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Cash on Delivery"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-5 w-5 border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-blue-500 px-6 py-3 text-lg font-medium text-white shadow-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Order
          </button>
        </form>
      </div>

      {/* Modal for PaymentForm */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PaymentForm totalPrice={totalPrice} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
}

export default OrderDetails;
