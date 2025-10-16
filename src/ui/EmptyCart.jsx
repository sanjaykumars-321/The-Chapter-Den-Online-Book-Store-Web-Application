import { useDispatch } from "react-redux";
import { CartClicked } from "../features/cart/cartSlice";
import { LuPackageOpen } from "react-icons/lu";
import { Link } from "react-router-dom";

function EmptyCart() {
  const dispatch = useDispatch();

  function handleCloseCart() {
    dispatch(CartClicked(false));
  }
  return (
    <div className="flex h-[35rem] flex-col items-center justify-center gap-6">
      <LuPackageOpen size={80} className="text-gray-300" />
      <p className="text-xl font-normal text-gray-800">
        Your cart is currently empty
      </p>
      <Link
        to="/books"
        onClick={handleCloseCart}
        className="rounded-full bg-gray-400 px-6 py-2 text-lg font-semibold text-white hover:bg-[#ff5500] active:bg-[#ff5500]"
      >
        Order your books now
      </Link>
    </div>
  );
}

export default EmptyCart;
