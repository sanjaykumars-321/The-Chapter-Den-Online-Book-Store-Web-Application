import { useDispatch, useSelector } from "react-redux";
import { ConfirmPasswordView, SignUpPasswordView } from "../user/userSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import FormError from "../../ui/FormError";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";
import { Link } from "react-router-dom";
// import { useUser } from "./useUser";
import signupImage from "../../../public/images/login-signup-image.webp";

function SignUp() {
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const passwordType = useSelector((store) => store.user.signUppasswordViewBtn);
  const confirmPasswordType = useSelector(
    (store) => store.user.confirmPasswordBtn,
  );

  // const { user } = useUser();

  const { register, handleSubmit, getValues, reset } = useForm();

  const { signup, isLoading } = useSignup();

  function handlePasswordType(e) {
    e.preventDefault();

    dispatch(SignUpPasswordView());
  }

  function handleConfirmPasswordType(e) {
    e.preventDefault();

    dispatch(ConfirmPasswordView());
  }

  function onSubmit(data) {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      doorNoStreet,
      landMark,
      city,
      pinCode,
      state,
    } = data;

    signup(
      {
        fullName,
        email,
        password,
        phoneNumber,
        doorNoStreet,
        landMark,
        city,
        pinCode,
        state,
      },
      {
        onSettled: () => reset(),
      },
    );
  }

  function onError(error) {
    setErrors(error);
  }

  return (
    <div className="grid grid-cols-2 items-start justify-center gap-8 px-4">
      <div className="flex items-center justify-center">
        <img
          src={signupImage}
          className="h-[33rem] w-[33rem]"
          alt="login image"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        <form
          className="formLayout w-[32rem]"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <h1 className="formTitle">Sign Up to The Chapter Den</h1>
          <div className="flex flex-col gap-4 px-4">
            <label htmlFor="fullName" className="formLabel">
              Full name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="formInputBox"
              {...register("fullName", {
                required: "This field is required",
              })}
              disabled={isLoading}
            />
            {errors?.fullName?.message && (
              <FormError>{errors.fullName.message}</FormError>
            )}
          </div>

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
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
                // validate: (value) => {
                //   value !== user.email,

                // },
              })}
              disabled={isLoading}
            />
            {errors?.email?.message && (
              <FormError>{errors.email.message}</FormError>
            )}
          </div>
          <div className="flex flex-col gap-4 px-4">
            <label htmlFor="password" className="formLabel">
              Password (min 8 characters)
            </label>
            <div className="relative">
              <input
                type={`${passwordType ? "password" : "text"}`}
                name="password"
                id="password"
                className="formInputBox"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Password should be at least 8 characters",
                  },
                })}
                disabled={isLoading}
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

          <div className="flex flex-col gap-4 px-4">
            <label htmlFor="password" className="formLabel">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={`${confirmPasswordType ? "password" : "text"}`}
                name="confirmPassword"
                id="confirmPassword"
                className="formInputBox"
                {...register("confirmPassword", {
                  required: "This field is required",

                  validate: (value) =>
                    value === getValues().password || "Passwords do not match",
                })}
                disabled={isLoading}
              />
              <button
                className="absolute right-[1rem] top-[7px]"
                onClick={handleConfirmPasswordType}
              >
                {confirmPasswordType ? (
                  <FaRegEyeSlash size={24} className="text-gray-800" />
                ) : (
                  <FaRegEye size={24} className="text-[#ff5500]" />
                )}
              </button>
            </div>
            {errors?.confirmPassword?.message && (
              <FormError>{errors.confirmPassword.message}</FormError>
            )}
          </div>

          <div className="flex flex-col gap-4 px-4">
            <label htmlFor="phoneNumber" className="formLabel">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="formInputBox"
              {...register("phoneNumber", {
                required: "This field is required",
                minLength: {
                  value: 10,
                  message: "PhoneNumber invalidate",
                },
              })}
              disabled={isLoading}
            />
            {errors?.phoneNumber?.message && (
              <FormError>{errors.phoneNumber.message}</FormError>
            )}
          </div>

          <div className="flex flex-col gap-4 px-4">
            <label className="formLabel">Home Address</label>
            <div className="flex gap-4">
              <div className="flex flex-col gap-4 px-4">
                <label htmlFor="doorNoStreet" className="formLabel">
                  Door No & Street:
                </label>
                <input
                  type="text"
                  name="doorNoStreet"
                  id="doorNoStreet"
                  className="formInputBox w-full"
                  {...register("doorNoStreet", {
                    required: "This field is required",
                  })}
                  disabled={isLoading}
                />
                {errors?.doorNoStreet?.message && (
                  <FormError>{errors.doorNoStreet.message}</FormError>
                )}
              </div>

              <div className="flex flex-col gap-4 px-4">
                <label htmlFor="landMark" className="formLabel">
                  Land Mark:
                </label>
                <input
                  type="text"
                  name="landMark"
                  id="landMark"
                  className="formInputBox w-full"
                  {...register("landMark", {
                    required: "This field is required",
                  })}
                  disabled={isLoading}
                />
                {errors?.landMark?.message && (
                  <FormError>{errors.landMark.message}</FormError>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-4 px-4">
                <label htmlFor="city" className="formLabel">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="formInputBox w-full"
                  {...register("city", {
                    required: "This field is required",
                  })}
                  disabled={isLoading}
                />
                {errors?.city?.message && (
                  <FormError>{errors.city.message}</FormError>
                )}
              </div>

              <div className="flex flex-col gap-4 px-4">
                <label htmlFor="pinCode" className="formLabel">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pinCode"
                  id="pinCode"
                  className="formInputBox w-full"
                  {...register("pinCode", {
                    required: "This field is required",
                  })}
                  disabled={isLoading}
                />
                {errors?.pinCode?.message && (
                  <FormError>{errors.pinCode.message}</FormError>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 px-4">
              <label htmlFor="state" className="formLabel">
                State
              </label>
              <input
                type="text"
                name="state"
                id="state"
                className="formInputBox w-full"
                {...register("state", {
                  required: "This field is required",
                })}
                disabled={isLoading}
              />
              {errors?.state?.message && (
                <FormError>{errors.state.message}</FormError>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 px-4 transition-all">
            <p className="text-base font-medium text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-[#ff5500] underline">
                Log in
              </Link>
            </p>
            <button className="w-[22.5rem] rounded-full bg-[#ff5500] px-4 py-2 text-xl font-medium text-white hover:bg-[#E64D00] active:bg-[#E64D00]">
              {isLoading ? <SpinnerMini /> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
