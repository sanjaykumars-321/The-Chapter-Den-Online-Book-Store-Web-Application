import { NavLink } from "react-router-dom";

import { IoCartOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";

import LogSignButton from "./LogSignButton";
import { userButton } from "../features/user/userSlice";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { useUser } from "../features/Auth/useUser";

import UserModal from "./UserModal";
import { CartClicked } from "../features/cart/cartSlice";
import Cart from "../pages/Cart";
import { useCartLists } from "../features/cart/useCartLists";
import SpinnerMini from "./SpinnerMini";
import { UserModalClicked } from "./modalSlice";
import Spinner from "./Spinner";

function Navigation() {
  const dispatch = useDispatch();
  const userBtn = useSelector((store) => store.user.userBtn);
  const cartClicked = useSelector((store) => store.cart.cartClicked);
  const { isAuthenticated, user } = useUser();
  const userDatas = user?.user_metadata;
  const fullNameFirstLetter = userDatas?.fullName.slice(0, 1);

  // const [userModal, setUserModal] = useState(false);

  const userModal = useSelector((store) => store.modal.userModal);

  function handleModal() {
    dispatch(UserModalClicked());
  }

  const { cartList, isLoading: isCarting } = useCartLists();

  const userCartList = cartList?.filter((cart) => cart?.user_id === user?.id);

  const sortedCartList = userCartList?.slice().sort((a, b) => b?.id - a?.id);

  const totalQuantity = sortedCartList?.reduce(
    (acc, cart) => acc + (cart?.quantity || 0),
    0,
  );

  return (
    <ul className="flex items-center justify-around gap-12 text-lg font-semibold text-gray-800">
      <li>
        <NavLink to="/books" className="navhover navBg transition-all">
          View Books
        </NavLink>
      </li>

      <li>
        <NavLink to="/about" className="navhover navBg transition-all">
          About
        </NavLink>
      </li>

      {!isAuthenticated ? (
        <li>
          <button onClick={() => dispatch(userButton())}>
            <HiOutlineUserPlus
              size={75}
              className="navhover navBg transition-all"
            />
          </button>
          {userBtn && <LogSignButton />}
        </li>
      ) : (
        <li>
          <button
            className="flex h-[2.6rem] w-[2.6rem] items-center justify-center rounded-full border-4 border-slate-300 bg-slate-600 px-4 py-4 text-xl font-normal text-white hover:border-slate-400"
            onClick={handleModal}
          >
            <span>{fullNameFirstLetter?.toUpperCase()}</span>
          </button>
          {userModal && (
            // <UserModal userModal={userModal} setUserModal={setUserModal} />
            <UserModal />
          )}
        </li>
      )}

      {/* {logNav === true && (
        <li>
          <button
            className="flex h-[2.6rem] w-[2.6rem] items-center justify-center rounded-full border-4 border-slate-300 bg-slate-600 px-4 py-4 text-xl font-normal text-white hover:border-slate-400"
            onClick={handleModal}
          >
            <span>{emailFirstLetter?.toUpperCase()}</span>
          </button>
          {userModal && <UserModal />}
        </li>
      )} */}

      <li>
        <button
          onClick={() => {
            dispatch(CartClicked(true));
          }}
        >
          <div>
            <IoCartOutline
              size={75}
              className="navBg navhover relative transition-all"
            />
            <div className="absolute right-[3.8rem] top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#ff5500] text-center text-[0.95rem] text-white">
              <p>
                {sortedCartList ? (
                  isCarting ? (
                    <SpinnerMini />
                  ) : (
                    totalQuantity
                  )
                ) : (
                  "0"
                )}
              </p>
            </div>
          </div>
        </button>
        {cartClicked && <Cart />}
      </li>
    </ul>
  );
}

export default Navigation;
