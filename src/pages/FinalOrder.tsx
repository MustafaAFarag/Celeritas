import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { type CartItem } from '../context/CartContext';

function FinalOrder() {
  const location = useLocation();
  const { orderId, products, totalPrice, isPriority } = location.state || {};

  // Define positions for Alexandria (van) and Cairo (man)
  const alexandriaPosition: [number, number] = [31.236613, 29.953604]; // Alexandria coordinates
  const cairoPosition: [number, number] = [30.0444, 31.2357]; // Cairo coordinates

  // Line path from Alexandria to Cairo
  const pathPositions: [number, number][] = [alexandriaPosition, cairoPosition];

  // Custom van and man icons
  const vanIcon = new L.Icon({
    iconUrl: 'https://img.icons8.com/ios/452/van-filled.png', // dark background van icon
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  const manIcon = new L.Icon({
    iconUrl: 'https://img.icons8.com/ios/452/user-male-filled.png', // dark background man icon
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  // State to hold the van's position
  const [vanPosition, setVanPosition] =
    useState<[number, number]>(alexandriaPosition);

  // Move the van icon gradually towards Cairo
  useEffect(() => {
    const interval = setInterval(() => {
      setVanPosition((currentPosition) => {
        const [currentLat, currentLng] = currentPosition;
        const [targetLat, targetLng] = cairoPosition;

        // Calculate the new position with a small step towards the target
        const latDiff = targetLat - currentLat;
        const lngDiff = targetLng - currentLng;
        const step = 0.004; // Adjust this step size for faster or slower movement

        const newLat =
          currentLat +
          (latDiff > 0 ? Math.min(step, latDiff) : Math.max(-step, latDiff));
        const newLng =
          currentLng +
          (lngDiff > 0 ? Math.min(step, lngDiff) : Math.max(-step, lngDiff));

        // Stop the van when it reaches the destination
        if (Math.abs(latDiff) < step && Math.abs(lngDiff) < step) {
          clearInterval(interval);
          return cairoPosition; // Snap to final destination
        }

        return [newLat, newLng];
      });
    }, 500); // Update every 100ms for smooth animation

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-center text-4xl font-bold">
        Order Confirmation
      </h1>
      <p className="mb-4 text-center text-lg">Thank you for your purchase!</p>
      <p className="mb-4 text-center text-lg font-semibold">
        Order ID: {orderId}
      </p>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Purchased Products:</h2>
        <ul className="space-y-4">
          {products?.map((product: CartItem) => (
            <li key={product.id} className="rounded-lg border p-4 shadow">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
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
          center={[30.8, 30.6]} // Center between Alexandria and Cairo
          zoom={7}
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Moving van marker */}
          <Marker position={vanPosition} icon={vanIcon} />

          {/* Static man marker (Cairo) */}
          <Marker position={cairoPosition} icon={manIcon} />

          {/* Line from Alexandria to Cairo */}
          <Polyline positions={pathPositions} color="blue" weight={4} />
        </MapContainer>
      </div>
    </div>
  );
}

export default FinalOrder;
