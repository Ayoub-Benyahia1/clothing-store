import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { loginUser, registerUser } from "../redux/slices/authSlice";
import { useToast } from "@/hooks/use-toast";

const AuthPage = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    if (type === "login") {
      try {
        const result = await dispatch(loginUser(data)).unwrap();
        toast({
          variant: "success",
          title: "Success!",
          description: "You have successfully sign in!",
        });
        navigate("/dashboard");
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Sign in Failed",
          description: err.message || "Something went wrong",
        });
      }
    } else {
      try {
        const result = await dispatch(
          registerUser({ id: uuidv4(), ...data })
        ).unwrap();
        toast({
          variant: "success",
          title: "Success!",
          description: "You have successfully sign up!",
        });
        navigate("/sign-in");
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Sign up Failed",
          description: err.message || "Something went wrong",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {type === "login" ? "Sign in" : "Sign up"}
        </h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          {type === "register" && (
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className={`${
                errors.email && "border-red-500"
              } border p-2 w-full mb-2`}
            />
          )}
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            {...register("name", {
              required: "Name is required",
              minLength: { value: 5, message: "at least 5 characters" },
            })}
            placeholder="Full Name"
            className={`${
              errors.name && "border-red-500"
            } border p-2 w-full mb-2`}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "at least 8 characters" },
            })}
            type="password"
            placeholder="Password"
            className={`${
              errors.password && "border-red-500"
            } border p-2 w-full mb-2`}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button type="submit" className="bg-blue-500 text-white p-2 w-full">
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>
        {type === "login" ? (
          <span>
            you don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 underline">
              Sign up
            </Link>
          </span>
        ) : (
          <span>
            you already have an account?{" "}
            <Link to="/sign-in" className="text-blue-500 underline">
              Sign in
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export const Login = () => <AuthPage type="login" />;
export const Register = () => <AuthPage type="register" />;
