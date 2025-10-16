import { useOutletContext } from "react-router-dom";
import UserDetails from "../ui/UserDetails";

export default function User() {
  const { handleOutsideClick } = useOutletContext();
  return (
    <section
      className="overflow-hidden px-[4.8rem] pb-[5rem] pt-[2rem]"
      onClick={handleOutsideClick}
    >
      <UserDetails />
    </section>
  );
}
