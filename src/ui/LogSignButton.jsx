import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login, signUp, userButton } from "../features/user/userSlice";

function LogSignButton() {
  const dispatch = useDispatch();

  function handleLogSignButton() {
    dispatch(userButton());
  }

  function handleLogIn() {
    dispatch(login(true));
    dispatch(signUp(false));
    handleLogSignButton();
  }
  function handleSignUp() {
    dispatch(signUp(true));
    dispatch(login(false));
    handleLogSignButton();
  }

  return (
    <div className="absolute right-[8rem] top-[6.5rem] flex h-[11rem] w-[12rem] flex-col items-center justify-center gap-6 rounded-xl bg-white px-4 py-4 text-gray-900 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] transition-all">
      <Link
        to="/login"
        onClick={handleLogIn}
        className="logsignButton hover: border-2 border-[#FF884D] hover:bg-[#FFCCB3] active:bg-[#FFCCB3]"
      >
        Log In
      </Link>
      <Link
        to="/signUp"
        onClick={handleSignUp}
        className="logsignButton hover bg-[#ff5500] text-white hover:bg-[#E64D00] active:bg-[#E64D00]"
      >
        Sign Up
      </Link>
    </div>
  );
}
export default LogSignButton;
