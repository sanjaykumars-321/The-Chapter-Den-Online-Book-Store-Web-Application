import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmPasswordView, SignUpPasswordView } from "../user/userSlice";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { useUpdatePassword } from "./useUpdatePassword";

import FormError from "../../ui/FormError";
import SpinnerMini from "../../ui/SpinnerMini";
import { useState } from "react";
import updatePasswordImage from "../../../public/images/login-signup-image.webp";

function UpdatePasswordForm() {
  const [errors, setErrors] = useState();

  const dispatch = useDispatch();

  const passwordType = useSelector((store) => store.user.signUppasswordViewBtn);
  const confirmPasswordType = useSelector(
    (store) => store.user.confirmPasswordBtn,
  );

  const { register, handleSubmit, getValues } = useForm();

  const { updatePassword, isLoading } = useUpdatePassword();

  function handlePasswordType(e) {
    e.preventDefault();

    dispatch(SignUpPasswordView());
  }

  function handleConfirmPasswordType(e) {
    e.preventDefault();

    dispatch(ConfirmPasswordView());
  }

  function onSubmit(data) {
    const { password } = data;

    let newPassword = password;
    updatePassword({ newPassword });
  }

  function onError(error) {
    setErrors(error);
  }

  return (
    <div className="grid grid-cols-2 items-center justify-center gap-8 px-4">
      <div className="flex items-center justify-center">
        <img
          src={updatePasswordImage}
          className="h-[33rem] w-[33rem]"
          alt="login image"
        />
      </div>
      <div className="flex items-center justify-center">
        <form
          className="formLayout gap-8"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <h1 className="formTitle">Update Password</h1>

          <div className="flex flex-col gap-4 px-4">
            <label htmlFor="password" className="formLabel">
              new Password (min 8 characters)
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

          <div className="flex flex-col items-center justify-center gap-4 px-4">
            <button className="w-[22.5rem] rounded-full bg-[#ff5500] px-4 py-2 text-center text-xl font-medium text-white hover:bg-[#E64D00] active:bg-[#E64D00]">
              {isLoading ? <SpinnerMini /> : "Update Passsword"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePasswordForm;
