import { useOutletContext } from "react-router-dom";
import SignUpForm from "../features/Auth/SignUpForm";
function SignUp() {
  const { handleOutsideClick } = useOutletContext();
  return (
    <section
      className="overflow-hidden px-[4.8rem] py-[2.4rem]"
      onClick={handleOutsideClick}
    >
      <SignUpForm />
    </section>
  );
}
export default SignUp;
