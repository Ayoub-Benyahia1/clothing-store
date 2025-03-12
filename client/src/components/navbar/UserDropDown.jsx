import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";

function UserDropDown({ isAuthenticated, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      return navigate("/");
    } else {
      console.error("Erreur lors de la déconnexion :", result.error.message);
    }
  };

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
          <DropdownMenuLabel>Welcome {user?.name || user}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/user/dashboard">
            <DropdownMenuItem className="cursor-pointer">
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Link to="/user/profile">
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer">
            My orders
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export default UserDropDown;
