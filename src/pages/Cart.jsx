import { useDispatch } from "react-redux";
import CartList from "../features/cart/CartList";
import { CartClicked } from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();

  function handleCloseCart() {
    dispatch(CartClicked(false));
  }

  function handleOutsideClick(e) {
    const outsideCart = e.target.getAttribute("id");
    if (outsideCart !== "CartOutSide") return;

    if (outsideCart === "CartOutSide") handleCloseCart();
  }

  return (
    <div
      id="CartOutSide"
      className="fixed inset-0 left-0 top-0 z-50 min-h-screen w-full overflow-y-auto overflow-x-hidden bg-[#0f0e0e72] transition-all"
      onClick={handleOutsideClick}
    >
      <CartList />
    </div>
  );
}
