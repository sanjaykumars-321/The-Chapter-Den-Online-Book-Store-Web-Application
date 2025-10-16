import { useOutletContext } from "react-router-dom";
import OrderUserForm from "../features/order/OrderUserForm";

export default function Order() {
  const { handleOutsideClick } = useOutletContext();
  return (
    <section
      className="overflow-hidden px-[6.4rem] pb-[6.4rem] pt-[3.6rem]"
      onClick={handleOutsideClick}
    >
      <OrderUserForm />
    </section>
  );
}
