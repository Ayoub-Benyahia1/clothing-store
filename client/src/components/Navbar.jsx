import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Menu, ShoppingCart, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Link } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import { useSelector } from "react-redux";
import CartBadge from "./CartBadge";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");

  return (
    <nav className="px-2 md:px-10 bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold text-gray-900">
          ClothingStore
        </Link>

        <div className="hidden md:flex w-1/3">
          <Input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Desktop Navigation & Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link to="/all-products" className="text-gray-700 hover:text-gray-900">
            All products
          </Link>
          <Button variant="ghost">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <CartBadge />
            </div>
          </Button>
          <UserDropDown isAuthenticated={isAuthenticated} user={user} />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <Link to="/shop" className="block py-2 text-lg">
                Shop
              </Link>
              <Link to="/categories" className="block py-2 text-lg">
                Categories
              </Link>
              <Link to="/contact" className="block py-2 text-lg">
                Contact
              </Link>
              <div className="flex mt-4 space-x-4">
                <Button variant="ghost">
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    <CartBadge />
                  </div>
                </Button>
                <UserDropDown isAuthenticated={isAuthenticated} user={user} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
