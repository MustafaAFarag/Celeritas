import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { type CartItem } from '../context/CartContext';

function FinalOrder() {
  const location = useLocation();
  const { orderId, products, totalPrice, isPriority } = location.state || {};

  const alexandriaPosition: [number, number] = [31.236613, 29.953604];
  const cairoPosition: [number, number] = [30.0444, 31.2357];

  const vanIcon = new L.Icon({
    iconUrl: 'https://img.icons8.com/ios/452/van-filled.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  const manIcon = new L.Icon({
    iconUrl: 'https://img.icons8.com/ios/452/user-male-filled.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  const [vanPosition, setVanPosition] =
    useState<[number, number]>(alexandriaPosition);
  const [pathPositions, setPathPositions] = useState<[number, number][]>([
    alexandriaPosition,
    cairoPosition,
  ]);

  const [formattedDeliveryDate, setFormattedDeliveryDate] =
    useState<string>('');

  useEffect(() => {
    const estimatedDeliveryDays = isPriority
      ? 1
      : Math.floor(Math.random() * 3) + 1;
    const date = new Date();
    date.setDate(date.getDate() + estimatedDeliveryDays);

    const randomHour = Math.floor(Math.random() * 2) + 8; // Between 8 and 9 AM
    const randomMinute = Math.floor(Math.random() * 60);
    const formattedDeliveryTime = `${randomHour}:${randomMinute.toString().padStart(2, '0')} AM`;
    const formatted = `${date.toLocaleDateString()} (${estimatedDeliveryDays} day(s) at ${formattedDeliveryTime})`;

    setFormattedDeliveryDate(formatted);
  }, [isPriority]); // Runs once when `isPriority` changes

  useEffect(() => {
    const interval = setInterval(() => {
      setVanPosition((currentPosition) => {
        const [currentLat, currentLng] = currentPosition;
        const [targetLat, targetLng] = cairoPosition;
        const latDiff = targetLat - currentLat;
        const lngDiff = targetLng - currentLng;
        const step = 0.002;

        const newLat =
          currentLat +
          (latDiff > 0 ? Math.min(step, latDiff) : Math.max(-step, latDiff));
        const newLng =
          currentLng +
          (lngDiff > 0 ? Math.min(step, lngDiff) : Math.max(-step, lngDiff));

        setPathPositions([[newLat, newLng], cairoPosition]);

        if (Math.abs(latDiff) < step && Math.abs(lngDiff) < step) {
          clearInterval(interval);
          return cairoPosition;
        }

        return [newLat, newLng];
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-8 text-text">
      <h1 className="mb-6 text-center text-4xl font-bold">
        Order Confirmation
      </h1>
      <p className="mb-4 text-center text-lg">Thank you for your purchase!</p>
      <p className="mb-4 text-center text-lg font-semibold">
        Order ID: {orderId}
      </p>
      <p className="mb-4 text-center text-lg font-semibold">
        Estimated Arrival Date: {formattedDeliveryDate}
      </p>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Purchased Products:</h2>
        <ul className="space-y-4">
          {products?.map((product: CartItem) => (
            <li
              key={product.id}
              className="flex rounded-lg border bg-white p-4 shadow dark:bg-gray-800"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="mr-4 h-20 w-20 rounded object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-lg font-semibold">Total Price: ${totalPrice}</p>
      <p className="mt-4 text-lg font-semibold">
        Priority Order: {isPriority ? 'Yes (+$25)' : 'No'}
      </p>

      {/* Map Section */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Track your order:</h2>
        <MapContainer
          center={[30.8, 30.6]}
          zoom={7}
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={vanPosition} icon={vanIcon} />
          <Marker position={cairoPosition} icon={manIcon} />
          <Polyline positions={pathPositions} color="blue" weight={4} />
        </MapContainer>
      </div>
    </div>
  );
}

export default FinalOrder;
