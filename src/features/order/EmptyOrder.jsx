import { LuPackageX } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function EmptyOrder() {
  return (
    <div className="m-auto flex h-[30rem] flex-col items-center justify-center gap-16 transition-all">
      <span>
        <LuPackageX size={100} className="text-gray-900" />
      </span>

      <p className="text-2xl font-medium text-gray-900">
        You don’t have any orders yet. Add your favourite books to the cart to
        place your first order!
      </p>
      <Link
        to="/books"
        className="w-[30rem] rounded-full bg-[#ff5500] px-4 py-2 text-center text-2xl font-semibold text-white hover:bg-[#E64D00] active:bg-[#E64D00]"
      >
        Order Books
      </Link>
    </div>
  );
}
