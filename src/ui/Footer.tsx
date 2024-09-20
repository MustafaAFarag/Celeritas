function Footer() {
  return (
    <footer className="mt-4 bg-sellers-background p-10 text-text">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Contacts Section */}
        <div>
          <h3 className="mb-4 text-xl font-bold">Contact Us</h3>
          <ul className="space-y-2">
            <li>
              Email:{' '}
              <span className="text-blue-500">support@schnellkorb.com</span>
            </li>
            <li>
              Phone: <span className="text-blue-500">+1 (800) 123-4567</span>
            </li>
            <li>
              Address:{' '}
              <span className="text-blue-500">
                123 Market St, Alexandria, Egypt
              </span>
            </li>
          </ul>
        </div>

        {/* Help & FAQ Section */}
        <div>
          <h3 className="mb-4 text-xl font-bold">Help & FAQ</h3>
          <ul className="space-y-2">
            {[
              'FAQs',
              'Shipping Information',
              'Return Policy',
              'Customer Support',
            ].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="transition-colors hover:text-primary"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* About Us Section */}
        <div>
          <h3 className="mb-4 text-xl font-bold">About Schnell Korb</h3>
          <ul className="space-y-2">
            {['About Us', 'Careers', 'Blog', 'Privacy Policy'].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="transition-colors hover:text-primary"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="mb-4 text-xl font-bold">Follow Us</h3>
          <ul className="space-y-2">
            {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map(
              (platform) => (
                <li key={platform}>
                  <a
                    href={`https://${platform.toLowerCase()}.com`}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {platform}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto mt-8 border-t border-gray-600 pt-8 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Schnell Korb. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
