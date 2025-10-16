import { useForm } from "react-hook-form";
import { useUser } from "../features/Auth/useUser";
import { useState } from "react";
import { useUpdateUser } from "../features/Auth/useUpdateUser";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";
import userDetailsImage from "../../public/images/user-details-image.webp";

function UserDetails() {
  const { user } = useUser();
  const userDatas = user?.user_metadata;
  const fullNameFirstLetter = userDatas?.fullName.slice(0, 1);

  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState(null);

  const { updateUser, isLoading } = useUpdateUser();

  function onSubmit(data) {
    const { phoneNumber, doorNoStreet, landMark, city, pinCode, state } = data;
    console.log(phoneNumber, doorNoStreet, landMark, city, pinCode, state);
    updateUser(
      { phoneNumber, doorNoStreet, landMark, city, pinCode, state },
      {
        onSuccess: () => {
          toast.success("Your details are successfully updated");
        },
      },
    );
  }

  function onError(error) {
    setErrors(error);
  }

  return (
    <div className="grid min-h-screen grid-cols-2 flex-col items-center justify-center gap-14">
      <div className="flex flex-col gap-8">
        <div className="flex w-full flex-col items-start justify-start">
          <div className="flex gap-4">
            <button className="flex h-[3.6rem] w-[3.6rem] items-center justify-center rounded-full bg-[#ff5500] px-4 py-4 text-2xl font-normal text-white">
              <span>{fullNameFirstLetter?.toUpperCase()}</span>
            </button>
            <h1 className="text-[2rem] font-semibold text-gray-900">
              Welcome, {userDatas?.fullName}
            </h1>
          </div>
          <h2 className="px-[5rem] text-xl font-normal text-gray-900">
            {user?.email}
          </h2>
        </div>
        <img src={userDetailsImage} />
      </div>

      <div className="flex w-[40rem] flex-col items-center justify-center gap-8 rounded-2xl border-2 border-gray-300 px-8 py-[3rem]">
        <h1 className="text-[2rem] font-semibold text-gray-900">
          {" "}
          Update Your Details
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4 px-4">
            <label htmlFor="phoneNumber" className="formLabel">
              Phone Number :
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              className="formInputBox bg-slate-100 focus:bg-white"
              {...register("phoneNumber", {
                required: "This field is required",
                minLength: {
                  value: 10,
                  message: "PhoneNumber invalidate",
                },
              })}
              defaultValue={userDatas?.phoneNumber}
              disabled={isLoading}
            />
            {errors?.phoneNumber?.message && (
              <FormError>{errors.phoneNumber.message}</FormError>
            )}
          </div>

          <div className="flex flex-col gap-4 px-4">
            <label className="formLabel">Home Address:</label>
            <div className="flex gap-4">
              <div className="flex flex-col gap-4 px-4">
                <label htmlFor="doorNoStreet" className="formLabel">
                  Door No & Street:
                </label>
                <input
                  type="text"
                  name="doorNoStreet"
                  id="doorNoStreet"
                  className="formInputBox w-full bg-slate-100 focus:bg-white"
                  {...register("doorNoStreet", {
                    required: "This field is required",
                  })}
                  defaultValue={userDatas?.doorNoStreet}
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
                  className="formInputBox w-full bg-slate-100 focus:bg-white"
                  {...register("landMark", {
                    required: "This field is required",
                  })}
                  defaultValue={userDatas?.landMark}
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
                  className="formInputBox w-full bg-slate-100 focus:bg-white"
                  {...register("city", {
                    required: "This field is required",
                  })}
                  defaultValue={userDatas?.city}
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
                  className="formInputBox w-full bg-slate-100 focus:bg-white"
                  {...register("pinCode", {
                    required: "This field is required",
                  })}
                  defaultValue={userDatas?.pinCode}
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
                className="formInputBox w-[80%] bg-slate-100 focus:bg-white"
                {...register("state", {
                  required: "This field is required",
                })}
                defaultValue={userDatas?.state}
                disabled={isLoading}
              />
              {errors?.state?.message && (
                <FormError>{errors.state.message}</FormError>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 px-4 transition-all">
            <button className="w-[80%] rounded-full bg-[#ff5500] px-4 py-2 text-xl font-medium text-white hover:bg-[#E64D00] active:bg-[#E64D00]">
              {isLoading ? <SpinnerMini /> : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
