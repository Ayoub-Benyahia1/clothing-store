import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../redux/slices/authSlice";

const AuthPage = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      type === "login" ? dispatch(loginUser(data)) : dispatch(registerUser({ id: 2, ...data}))
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {type === "login" ? "Login" : "Register"}
        </h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          {type === "register" && (
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="border p-2 w-full mb-2"
            />
          )}
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className="border p-2 w-full mb-2"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-2"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button type="submit" className="bg-blue-500 text-white p-2 w-full">
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export const Login = () => <AuthPage type="login" />;
export const Register = () => <AuthPage type="register" />;

