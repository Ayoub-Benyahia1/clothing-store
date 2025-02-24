import React, { useState } from "react";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import CartBadge from "./CartBadge";
import { ShoppingCart } from "lucide-react";
import UserDropDown from "./UserDropDown";

function DesktopNav({ isAuthenticated, user }) {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="hidden md:flex w-1/3">
        <Input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-gray-900">
          Home
        </Link>
        <Link to="/all-products" className="text-gray-700 hover:text-gray-900">
          All products
        </Link>
        <Link to="/cart" variant="ghost">
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            <CartBadge />
          </div>
        </Link>
        <UserDropDown isAuthenticated={isAuthenticated} user={user} />
      </div>
    </>
  );
}

export default DesktopNav;
