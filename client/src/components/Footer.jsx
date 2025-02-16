import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-8 px-2 md:px-10 border-t-2">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div>
          <h2 className="text-xl font-bold">ClothingStore</h2>
          <p className="text-gray-600 mt-2">
            Your one-stop shop for the latest fashion trends.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">Quick Links</h2>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li>
              <Link to="/shop" className="hover:text-black">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-black">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-black">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold">Follow Us</h2>
          <div className="flex space-x-4 mt-2 text-gray-600">
            <Link to="https://www.facebook.com" target="_blank" className="hover:text-black">
              <Facebook />
            </Link>
            <Link to="https://www.x.com" target="_blank" className="hover:text-black">
              <Twitter />
            </Link>
            <Link to="https://www.instagram.com/" target="_blank" className="hover:text-black">
              <Instagram />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-600 mt-6 text-sm">
        &copy; {new Date().getFullYear()} ClothingStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
