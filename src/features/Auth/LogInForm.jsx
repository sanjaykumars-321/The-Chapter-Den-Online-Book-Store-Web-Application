import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LogInPasswordView } from "../user/userSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormError from "../../ui/FormError";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { Link } from "react-router-dom";
import loginImage from "../../../public/images/login-signup-image.webp";

function LogInForm() {
  const [errors, setErrors] = useState();

  const dispatch = useDispatch();
  const passwordType = useSelector((store) => store.user.logInPasswordViewBtn);

  const { login, isLogin } = useLogin();

  const { register, handleSubmit, reset } = useForm();

  function handlePasswordType(e) {
    e.preventDefault();

    dispatch(LogInPasswordView());
  }

  function onSubmit(data) {
    const { email, password } = data;
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
      },
    );
  }

  function onError(error) {
    setErrors(error);
  }

  return (
    <div className="grid grid-cols-2 items-center justify-center gap-8 px-4">
      <div className="flex items-center justify-center">
        <img
          src={loginImage}
          className="h-[33rem] w-[33rem]"
          alt="login image"
        />
      </div>
      <div className="flex items-center justify-center">
        <form className="formLayout" onSubmit={handleSubmit(onSubmit, onError)}>
          <h1 className="formTitle">Login in to The Chapter Den</h1>
          <div className="flex flex-col gap-4 px-4">
            <label htmlFor="email" className="formLabel">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="formInputBox"
              {...register("email", {
                required: "This field is required",
              })}
              disabled={isLogin}
            />
            {errors?.email?.message && (
              <FormError>{errors.email.message}</FormError>
            )}
          </div>
          <div className="flex flex-col gap-4 px-4">
            <label htmlFor="password" className="formLabel">
              Password
            </label>
            <div className="relative">
              <input
                type={`${passwordType ? "password" : "text"}`}
                name="password"
                id="password"
                className="formInputBox"
                {...register("password", {
                  required: "This field is required",
                })}
                disabled={isLogin}
              />
              <button
                className="absolute right-[1rem] top-[7px]"
                onClick={handlePasswordType}
              >
                {passwordType ? (
                  <FaRegEyeSlash size={24} className="text-gray-800" />
                ) : (
                  <FaRegEye size={24} className="text-[#ff5500]" />
                )}
              </button>
            </div>
            {errors?.password?.message && (
              <FormError>{errors.password.message}</FormError>
            )}
          </div>
          <div className="w-full cursor-pointer px-4 text-start">
            <Link
              to="/resetPassword"
              className="text-base text-[#ff5500] hover:text-[#E64D00] active:text-[#E64D00]"
            >
              Forgot password?
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 px-4">
            <p className="text-base font-medium text-gray-700">
              New to The Chapter Den?{" "}
              <Link to="/signUp" className="text-[#ff5500] underline">
                Sign up &nbsp;
              </Link>
            </p>
            <button className="w-[22.5rem] rounded-full bg-[#ff5500] px-4 py-2 text-xl font-medium text-white hover:bg-[#E64D00] active:bg-[#E64D00]">
              {isLogin ? <SpinnerMini /> : "log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogInForm;
