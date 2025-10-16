import { Outlet } from "react-router-dom";
import Header from "../ui/header";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserModalClicked, UserModalClicked2 } from "../ui/modalSlice";
import { useUser } from "../features/Auth/useUser";
import Spinner from "../ui/Spinner";
import { userButton2 } from "../features/user/userSlice";
// import { useUser } from "../features/Auth/useUser";

function AppLayOut() {
  const sectionEl = useRef(null);
  const userModal = useSelector((store) => store.modal.userModal);
  const loginSignupModal = useSelector((store) => store.user.userBtn);

  const dispatch = useDispatch();

  const { isLoading: isAuthLoading } = useUser();

  if (isAuthLoading) return <Spinner />;

  function handleOutsideClick() {
    if (userModal === true) {
      // console.log(true);
      dispatch(UserModalClicked2(false));
    }

    if (loginSignupModal === true) {
      dispatch(userButton2(false));
    }
  }

  // const { user } = useUser();
  // console.log(user);

  return (
    <>
      <Header sectionEl={sectionEl} modalClose={handleOutsideClick} />

      <Outlet
        context={{ sectionEl, handleOutsideClick }}
        onClick={handleOutsideClick}
      />
    </>
  );
}

export default AppLayOut;
