import 'primeicons/primeicons.css'; // Import PrimeIcons CSS

type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mx-auto flex max-w-md items-center justify-center rounded-lg border border-red-300 bg-red-100 p-4 text-red-800 shadow-md">
      <div className="mr-3 flex-shrink-0">
        <i className="pi pi-exclamation-circle text-xl text-red-600"></i>{' '}
      </div>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}

export default ErrorMessage;
