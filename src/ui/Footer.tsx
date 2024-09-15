function Footer() {
  return (
    <footer className="bg-dark-background text-dark-text p-8 mt-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contacts Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li>Email: support@schnellkorb.com</li>
            <li>Phone: +1 (800) 123-4567</li>
            <li>Address: 123 Market St, Alexandria, Egypt</li>
          </ul>
        </div>

        {/* Help & FAQ Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Help & FAQ</h3>
          <ul className="space-y-2">
            <li>
              <a href="/faq" className="hover:text-primary transition-colors">
                FAQs
              </a>
            </li>
            <li>
              <a
                href="/shipping"
                className="hover:text-primary transition-colors"
              >
                Shipping Information
              </a>
            </li>
            <li>
              <a
                href="/returns"
                className="hover:text-primary transition-colors"
              >
                Return Policy
              </a>
            </li>
            <li>
              <a
                href="/support"
                className="hover:text-primary transition-colors"
              >
                Customer Support
              </a>
            </li>
          </ul>
        </div>

        {/* About Us Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Schnell Korb</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-primary transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a
                href="/careers"
                className="hover:text-primary transition-colors"
              >
                Careers
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-primary transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto text-center pt-8 border-t border-gray-600 mt-8">
        <p>
          &copy; {new Date().getFullYear()} Schnell Korb. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
