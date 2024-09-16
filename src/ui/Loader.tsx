import '../styles/index.css';

function Loader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <p className="animate-bounce text-lg font-medium text-gray-600">
        Loading, please wait...
      </p>
      <div className="spinner aspect-[1] w-16 rounded-full"></div>
    </div>
  );
}

export default Loader;
