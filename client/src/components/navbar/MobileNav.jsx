import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import CartBadge from "./CartBadge";

function MobileNav({ isAuthenticated, user }) {
  return (
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
            <Link to="/cart" variant="ghost">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <CartBadge />
              </div>
            </Link>
            <UserDropDown isAuthenticated={isAuthenticated} user={user} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
