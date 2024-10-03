import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

function Cart() {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } =
    useCart();
  const navigate = useNavigate(); // Initialize navigate function

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return <div className="text-center text-lg">Your cart is empty</div>;
  }

  const handleOrderClick = () => {
    navigate('/order-details', {
      state: { totalPrice }, // Pass totalPrice to OrderDetails page
    });
  };

  return (
    <div className="container mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-text">Your Cart</h1>
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg bg-background p-4 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-lg text-text">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-lg bg-gray-200 px-2">
                <button
                  className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                  onClick={() => decrementQuantity(item.id)}
                >
                  <FaMinus />
                </button>
                <span className="mx-2 w-8 text-center">{item.quantity}</span>
                <button
                  className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                  onClick={() => incrementQuantity(item.id)}
                >
                  <FaPlus />
                </button>
              </div>

              <button
                className="flex items-center rounded-lg bg-red-500 px-4 py-2 text-white shadow-lg transition duration-300 hover:bg-red-600 focus:outline-none"
                onClick={() => removeFromCart(item.id)}
              >
                <FaTrash className="mr-2" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between text-2xl font-semibold text-text">
        <p> Total Price: ${totalPrice.toFixed(2)}</p>
        <button
          className="rounded-lg bg-yellow-500 px-4 py-2 text-white shadow-lg transition duration-300 hover:bg-yellow-600 focus:outline-none"
          onClick={handleOrderClick}
        >
          Order!
        </button>
      </div>
    </div>
  );
}

export default Cart;
