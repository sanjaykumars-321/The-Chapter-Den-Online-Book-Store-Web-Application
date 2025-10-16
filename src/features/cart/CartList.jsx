import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { CartClicked } from "./cartSlice";

import { useCartLists } from "./useCartLists";
import EmptyCart from "../../ui/EmptyCart";

import Spinner from "../../ui/Spinner";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useUser } from "../Auth/useUser";

import SpinnerMini from "../../ui/SpinnerMini";
import { useDeleteItemCart } from "./useDeleteItemCart";
import { ImBooks } from "react-icons/im";
import { useUpdateCart } from "./useUpdateCart";
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function CartList() {
  const dispatch = useDispatch();

  function handleCloseCart() {
    dispatch(CartClicked(false));
  }

  const { cartList, isLoading } = useCartLists();
  const { user } = useUser();

  const userCartList = cartList?.filter((cart) => cart?.user_id === user?.id);

  const sortedCartList = userCartList?.slice().sort((a, b) => b?.id - a?.id);

  const { deleteCartItem, isLoading: isDeleting } = useDeleteItemCart();

  const { updateCart } = useUpdateCart();

  function handleDeleteItemCart(id) {
    deleteCartItem(id, {
      onSuccess: () => {
        toast.success("book remove from your cart");
      },
    });
    console.log(id);
  }

  function handleIncreaseQuantity(id, quantityIncrease, bookPrice) {
    const quantity = quantityIncrease + 1;
    const price = quantity * bookPrice;
    updateCart({ id, quantity, price });
  }

  function handleDecreaseQuantity(id, quantityDecrease, bookPrice) {
    if (quantityDecrease > 1) {
      const quantity = quantityDecrease - 1;
      const price = quantity * bookPrice;

      updateCart({ id, quantity, price });
    }
  }

  const totalPrice = sortedCartList?.reduce(
    (acc, cart) => acc + (cart?.total_book_price || 0),
    0,
  );

  const totalQuantity = sortedCartList?.reduce(
    (acc, cart) => acc + (cart?.quantity || 0),
    0,
  );

  return (
    <div className="absolute right-0 top-0 flex min-h-dvh w-[32.5rem] flex-col bg-white">
      {isLoading && <Spinner />}
      <div
        className="flex items-center justify-between px-4 py-4"
        id="CartInside"
      >
        {sortedCartList?.length === 0 ? (
          ""
        ) : (
          <h1 className="flex w-full items-center justify-center gap-2 px-4 text-xl font-medium text-gray-950">
            <ImBooks className="text-green-600" size={28} />
            Your Cart Is Ready!
          </h1>
        )}
        <button
          onClick={handleCloseCart}
          className="flex w-full items-end justify-end px-4 py-4"
        >
          <span>
            <IoCloseOutline
              size={30}
              className="text-gray-700 hover:text-gray-950 active:text-gray-900"
            />
          </span>
        </button>
      </div>

      {userCartList?.length === 0 ? (
        <EmptyCart />
      ) : (
        <ul className="mx-auto flex flex-col items-start justify-start gap-4 px-8 pb-[14rem] pt-4">
          {sortedCartList?.map((cart) => (
            <li
              className="flex w-[30rem] items-start justify-start gap-6 rounded-xl border-2 border-gray-100 px-4 py-4"
              key={cart.id}
            >
              <Link
                to={`/books/${cart.books.id}`}
                className="flex items-center justify-center"
              >
                <img
                  src={cart.books.image_front}
                  alt="book-image"
                  className="h-[10rem] w-[10rem] select-none rounded-lg"
                />
              </Link>

              <div className="flex w-[20rem] flex-col items-start justify-start gap-2">
                <Link
                  to={`/books/${cart.books.id}`}
                  className="text-lg font-semibold text-gray-900"
                >
                  {cart.books.book_name}{" "}
                </Link>
                <p className="flex items-center justify-center gap-4 text-sm font-normal text-gray-800">
                  {cart.books.type}{" "}
                  <span className="rounded-md bg-slate-100 px-4 py-1 font-medium text-gray-900">
                    {cart.books.book_type}
                  </span>
                </p>

                <div className="flex flex-col items-start justify-start gap-4 text-lg font-semibold text-gray-800">
                  <p className="text-start">
                    &#x20B9;
                    {cart?.total_book_price}
                  </p>
                  <div
                    className={`flex items-center justify-center gap-6 rounded-full border-2 border-[#FF9966] bg-white px-4 py-2 transition-all`}
                  >
                    <button
                      className={`text-gray-900 hover:text-[#ff5500] active:text-[#ff5500]`}
                      onClick={() =>
                        handleDecreaseQuantity(
                          cart.id,
                          cart.quantity,
                          cart.per_book_price,
                        )
                      }
                    >
                      <AiOutlineMinus size={14} />
                    </button>
                    <p className="cursor-default text-base font-normal text-gray-900">
                      {cart.quantity}
                    </p>
                    <button
                      className={`text-gray-900 hover:text-[#ff5500] active:text-[#ff5500]`}
                      onClick={() =>
                        handleIncreaseQuantity(
                          cart.id,
                          cart.quantity,
                          cart.per_book_price,
                        )
                      }
                    >
                      <AiOutlinePlus size={14} />
                    </button>
                  </div>
                </div>

                <div className="text-base font-semibold text-gray-800"></div>
              </div>

              <div className="flex h-[5rem] flex-col items-center justify-center gap-4">
                {/* <MdDeleteOutline size={30} className="text-red-600" /> */}

                <button
                  className="rounded-lg bg-slate-50 px-2 py-2 shadow-inner transition-all"
                  onClick={() => handleDeleteItemCart(cart.id)}
                >
                  {isDeleting ? (
                    <SpinnerMini />
                  ) : (
                    <MdDelete
                      size={25}
                      className="text-gray-600 hover:text-red-600"
                    />
                  )}
                </button>
                <p className="select-none text-center text-sm">Remove</p>
              </div>
            </li>
          ))}
          <div className="fixed bottom-4 mx-auto flex h-[11.5rem] w-[30rem] flex-col gap-5 rounded-md bg-white px-6 py-5 shadow-[0px_3px_8px_rgba(0,0,0,0.24)]">
            <div className="flex items-center justify-between px-4">
              <h1 className="text-2xl font-bold text-gray-950">Total Price</h1>
              <h1 className="text-2xl font-bold text-[#ff5500]">
                &#x20B9;{totalPrice}
              </h1>
            </div>
            <p className="flex items-center justify-center gap-2 text-center text-base font-semibold text-blue-950">
              <TbTruckDelivery size={25} />
              We always deliver for free — no delivery charges ever!
            </p>
            <Link
              to="/order"
              className="rounded-full bg-[#ff5500] px-4 py-2 text-center text-[1.2rem] font-medium text-white outline-none"
              onClick={handleCloseCart}
            >
              Proceed to Buy ({totalQuantity} books)
            </Link>
          </div>
        </ul>
      )}
    </div>
  );
}
export default CartList;
