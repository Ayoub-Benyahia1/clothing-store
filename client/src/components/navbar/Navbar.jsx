import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="px-2 md:px-10 bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold text-gray-900">
          ClothingStore
        </Link>
        <DesktopNav isAuthenticated={isAuthenticated} user={user} />
        <MobileNav isAuthenticated={isAuthenticated} user={user} />
      </div>
    </nav>
  );
};

export default Navbar;
