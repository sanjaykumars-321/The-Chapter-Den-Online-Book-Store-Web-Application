import { useForm } from "react-hook-form";

import { useState } from "react";

import { useUser } from "../Auth/useUser";
import { useUpdateUser } from "../Auth/useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCartLists } from "../cart/useCartLists";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdCash } from "react-icons/io";
import { MdOutlineLabelImportant } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuPackageX } from "react-icons/lu";
import { useCreateOrder } from "./useCreateOrder";
import { useDeleteItemCart } from "../cart/useDeleteItemCart";
import { SiWikibooks } from "react-icons/si";

import EmptyOrder from "./EmptyOrder";
import confirmImage from "../../../public/images/confirm-image.webp";

function OrderUserForm() {
  const { user } = useUser();
  const userDatas = user?.user_metadata;

  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState(null);

  const { updateUser, isLoading } = useUpdateUser();

  const { cartList, isLoading: isCarting } = useCartLists();

  const userCartList = cartList?.filter((cart) => cart?.user_id === user?.id);

  const sortedCartList = userCartList?.slice().sort((a, b) => b?.id - a?.id);

  const totalPrice = sortedCartList?.reduce(
    (acc, cart) => acc + (cart?.total_book_price || 0),
    0,
  );

  const { createOrder, isLoading: isOrdering } = useCreateOrder();

  const { deleteCartItem, isLoading: isDeleting } = useDeleteItemCart();

  function onSubmit(data) {
    const {
      fullName,
      phoneNumber,
      doorNoStreet,
      landMark,
      city,
      pinCode,
      state,
    } = data;

    updateUser({
      fullName,
      phoneNumber,
      doorNoStreet,
      landMark,
      city,
      pinCode,
      state,
    });

    const user_id = user?.id;
    const user_name = fullName;
    const phone_number = phoneNumber;
    const email = user?.email;
    const address = `${doorNoStreet}, ${landMark}, ${city} - ${pinCode}, ${state}`;
    const booksOrdered = { orderedBooks: sortedCartList };
    const total_bill = totalPrice;

    createOrder(
      {
        booksOrdered,
        total_bill,
        user_id,
        user_name,
        phone_number,
        email,
        address,
      },
      {
        onSuccess: () => {
          sortedCartList?.map((cartItems) => {
            if (!isDeleting) deleteCartItem(cartItems.id);
          });
        },
      },
    );
  }

  function onError(error) {
    setErrors(error);
  }

  return (
    <>
      {sortedCartList?.length === 0 ? (
        <EmptyOrder />
      ) : (
        <div className="grid w-full grid-cols-2 items-center justify-center gap-16">
          <div className="flex flex-col items-center justify-center gap-12">
            <div className="rounded-2xl border-2 border-gray-300 px-6 py-6">
              {isCarting ? (
                <SpinnerMini />
              ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center justify-center gap-4">
                    <span>
                      <IoMdCash size={80} className="text-green-700" />
                    </span>
                    <h1 className="text-justify text-[1.4rem] font-semibold text-gray-900">
                      You can pay{" "}
                      <span className="text-[#ff5500]">
                        &#x20B9;{totalPrice}
                      </span>{" "}
                      in cash on delivery when your books are delivered.
                    </h1>{" "}
                  </div>
                  <p className="flex items-center justify-center gap-2 text-center text-[1.2rem] font-semibold text-blue-950">
                    <TbTruckDelivery size={30} />
                    We always deliver for free — no delivery charges ever!
                  </p>
                </div>
              )}
            </div>

            <p className="flex items-start justify-start gap-4 rounded-lg border-2 border-[#FFDDCC] bg-[#FFEEE6] px-8 py-6 text-justify text-xl font-medium text-[#FF5500]">
              <span>
                <MdOutlineLabelImportant size={30} />
              </span>
              <span>
                Before placing your order, please review your name, phone
                number, and address details. If there are any changes, please
                update them in the form beside.
              </span>
            </p>

            <img src={confirmImage} className="h-[35rem] w-[35rem]" />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex w-[32.5rem] flex-col items-center justify-center gap-8 rounded-2xl border-2 border-gray-300 px-8 py-[3rem]">
              <h1 className="text-[2rem] font-semibold text-gray-900">
                Confirm Your Details
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col gap-4 px-4">
                  <label htmlFor="fullName" className="formLabel">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="formInputBox bg-slate-100 focus:bg-white"
                    {...register("fullName", {
                      required: "This field is required",
                    })}
                    defaultValue={user.user_metadata.fullName}
                    disabled={isLoading}
                  />
                  {errors?.fullName?.message && (
                    <FormError>{errors.fullName.message}</FormError>
                  )}
                </div>
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

                <div className="flex flex-col gap-4">
                  <label className="formLabel text-center text-xl">
                    Home Address:
                  </label>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 px-4">
                      <label htmlFor="doorNoStreet" className="formLabel">
                        Door No & Street:
                      </label>
                      <input
                        type="text"
                        name="doorNoStreet"
                        id="doorNoStreet"
                        className="formInputBox bg-slate-100 focus:bg-white"
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
                        className="formInputBox bg-slate-100 focus:bg-white"
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

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 px-4">
                      <label htmlFor="city" className="formLabel">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="formInputBox bg-slate-100 focus:bg-white"
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
                        className="formInputBox bg-slate-100 focus:bg-white"
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
                      className="formInputBox bg-slate-100 focus:bg-white"
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
                  <button className="w-full rounded-full bg-[#ff5500] px-4 py-2 text-xl font-medium text-white hover:bg-[#E64D00] active:bg-[#E64D00]">
                    {isOrdering ? (
                      <SpinnerMini />
                    ) : (
                      <span className="flex items-center justify-center gap-4">
                        <SiWikibooks /> Place Your Order
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderUserForm;
