import { CiLogout } from "react-icons/ci";
import { useUser } from "../features/Auth/useUser";
import { useLogOut } from "../features/Auth/useLogout";
import SpinnerMini from "./SpinnerMini";
import { Link } from "react-router-dom";
import { PiPackageDuotone } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { UserModalClicked } from "./modalSlice";

function UserModal() {
  const { user } = useUser();
  const dispatch = useDispatch();
  // console.log(user);
  const userDatas = user?.user_metadata;
  const fullNameFirstLetter = userDatas?.fullName?.slice(0, 1);
  const { logout, isLoading } = useLogOut();

  // const userModal = useSelector((store) => store.modal.userModal);

  function modalOff() {
    // setUserModal((modal) => !modal);
    dispatch(UserModalClicked());
  }

  function logModalOff() {
    // setUserModal((modal) => !modal);
    dispatch(UserModalClicked());
    logout();
  }

  return (
    <div className="absolute right-[2.5rem] top-[6.5rem] flex flex-col items-center justify-center gap-6 rounded-xl bg-white px-8 py-8 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] transition-all">
      <button className="flex h-[3.6rem] w-[3.6rem] items-center justify-center rounded-full border-4 border-slate-300 bg-slate-600 px-4 py-4 text-2xl font-normal text-white">
        <span>{fullNameFirstLetter?.toUpperCase()}</span>
      </button>
      <p className="text-base font-medium text-gray-900">
        {userDatas?.fullName.toUpperCase()}
      </p>
      <p className="text-base font-normal text-gray-600">{user?.email}</p>
      <Link
        to="/user"
        className="flex w-full items-start justify-center gap-2 rounded-full border-2 border-[#ff5500] px-4 py-2 text-center text-base font-medium text-[#ff5500] hover:bg-[#FFEEE6] active:bg-[#FFEEE6]"
        onClick={modalOff}
      >
        <CgProfile size={25} />
        View Profile
      </Link>
      <Link
        to="/orderedList"
        className="flex w-full items-start justify-center gap-2 rounded-full border-2 border-[#ff5500] px-4 py-2 text-center text-base font-medium text-[#ff5500] hover:bg-[#FFEEE6] active:bg-[#FFEEE6]"
        onClick={modalOff}
      >
        <PiPackageDuotone size={25} /> Your Orders
      </Link>
      <button
        className="flex w-full items-center justify-center gap-4 rounded-full bg-[#ff5500] px-4 py-2 text-base font-semibold text-white hover:bg-[#E64D00] active:bg-[#E64D00]"
        onClick={logModalOff}
      >
        {isLoading ? (
          <SpinnerMini />
        ) : (
          <span className="flex items-center justify-center gap-3">
            <CiLogout size={25} className="font-semibold" />
            logout
          </span>
        )}
      </button>
    </div>
  );
}

export default UserModal;
