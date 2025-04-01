import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* About Section */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Flipkart Stories
                </a>
              </li>
            </ul>
          </div>
          {/* Help Section */}
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Payments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Cancellation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          {/* Policy Section */}
          <div>
            <h4 className="font-semibold mb-4">Policy</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
          {/* Social Section */}
          <div>
            <h4 className="font-semibold mb-4">Social</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Divider */}
        <hr className="my-8 border-gray-700" />
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Footer Logo */}
          <div className="mb-4 md:mb-0">
            <a href="#" className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/40"
                alt="Logo"
                className="w-10 h-10"
              />
              <span className="font-bold text-lg">Flipkart</span>
            </a>
          </div>
          {/* Payment Options */}
          <div>
            <h4 className="font-semibold text-sm mb-2">Payment Options</h4>
            <div className="flex space-x-4">
              <img
                src="https://via.placeholder.com/40"
                alt="Visa"
                className="w-8 h-8"
              />
              <img
                src="https://via.placeholder.com/40"
                alt="MasterCard"
                className="w-8 h-8"
              />
              <img
                src="https://via.placeholder.com/40"
                alt="PayPal"
                className="w-8 h-8"
              />
              <img
                src="https://via.placeholder.com/40"
                alt="UPI"
                className="w-8 h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
