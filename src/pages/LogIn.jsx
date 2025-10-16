import { useOutletContext } from "react-router-dom";
import LogInForm from "../features/Auth/LogInForm";
function LogIn() {
  const { handleOutsideClick } = useOutletContext();
  return (
    <section
      className="overflow-hidden px-[4.8rem] py-[2.4rem]"
      onClick={handleOutsideClick}
    >
      <LogInForm />
    </section>
  );
}
export default LogIn;
