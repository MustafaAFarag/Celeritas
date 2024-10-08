import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import PaymentForm from '../features/OrderDetails/PaymentForm';
import Modal from '../ui/Modal';
import { useCart } from '../context/CartContext';

function OrderDetails() {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [fullName, setFullName] = useState<string>(user?.full_name ?? '');
  const [phoneNumber, setPhoneNumber] = useState<string>('01294790041');
  const [address, setAddress] = useState<string>('Alexandria, Egypt');
  const [isPriority, setIsPriority] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card');

  const baseTotalPrice = location.state?.totalPrice || 0;
  const totalPrice = isPriority ? baseTotalPrice + 25 : baseTotalPrice;

  const generateOrderId = () => {
    return `ORD-${Math.floor(Math.random() * 1000000)}`;
  };

  useEffect(() => {
    if (user) {
      setFullName(user.full_name);
    }
  }, [user]);

  const handleOrderSubmit = (e: FormEvent) => {
    e.preventDefault();
    const orderId = generateOrderId();
    if (paymentMethod === 'Credit Card') {
      setIsModalOpen(true);
    } else {
      finalizeOrder(orderId);
    }
  };

  const finalizeOrder = (orderId: string) => {
    clearCart();
    navigate('/final-order', {
      state: {
        orderId,
        products: cartItems,
        totalPrice,
        isPriority,
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-20 flex items-center justify-center bg-background">
      <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-gray-200">
          Order Details
        </h1>
        <form onSubmit={handleOrderSubmit} className="space-y-6">
          {/* Full Name Field */}
          <div>
            <label className="block text-xl font-medium text-gray-700 dark:text-gray-300">
              Full Name:
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-lg border-2 p-3 text-black shadow-sm dark:border-gray-600"
            />
          </div>
          {/* Phone Number Field */}
          <div>
            <label className="block text-xl font-medium text-gray-700 dark:text-gray-300">
              Phone Number:
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 w-full rounded-lg border-2 p-3 text-black shadow-sm dark:border-gray-600"
              required
            />
          </div>
          {/* Address Field */}
          <div>
            <label className="block text-xl font-medium text-gray-700 dark:text-gray-300">
              Address:
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 w-full rounded-lg border-2 p-3 text-black shadow-sm dark:border-gray-600"
              required
            />
          </div>
          {/* Priority Order Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isPriority}
              onChange={(e) => setIsPriority(e.target.checked)}
              className="h-5 w-5 border-gray-300 text-primary focus:ring-primary dark:border-gray-600"
            />
            <label className="text-xl font-medium text-gray-700 dark:text-gray-300">
              Priority Order (+$25)
            </label>
          </div>
          {/* Payment Method Selection */}
          <div>
            <label className="block text-xl font-medium text-gray-700 dark:text-gray-300">
              Payment Method:
            </label>
            <div className="mt-2 flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Credit Card"
                  checked={paymentMethod === 'Credit Card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-5 w-5 border-gray-300 text-primary focus:ring-primary dark:border-gray-600"
                />
                <span>Credit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Cash on Delivery"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-5 w-5 border-gray-300 text-primary focus:ring-primary dark:border-gray-600"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-primary px-6 py-3 text-xl font-medium text-white shadow-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Submit Order
          </button>
        </form>
      </div>

      {/* Modal for PaymentForm */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PaymentForm
          totalPrice={totalPrice}
          onClose={handleCloseModal}
          onSubmit={() => finalizeOrder(generateOrderId())} // On successful payment
        />
      </Modal>
    </div>
  );
}

export default OrderDetails;
