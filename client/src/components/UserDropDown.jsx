import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

function UserDropDown({ isAuthenticated }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <User className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      {isAuthenticated === false ? (
        <DropdownMenuContent>
          <Link to="/sign-in">
            <DropdownMenuItem className="cursor-pointer">
              Sign in
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link to="/sign-up">
            <DropdownMenuItem className="cursor-pointer">
              Sign up
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            My orders
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export default UserDropDown;
