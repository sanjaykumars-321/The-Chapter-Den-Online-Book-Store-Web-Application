import { useOutletContext } from "react-router-dom";


import Aboutdetails from "../ui/Aboutdetails";

export default function About() {
  const { sectionEl, handleOutsideClick } = useOutletContext();

  return (
    <section
      className="overflow-hidden px-10 py-6"
      ref={sectionEl}
      onClick={handleOutsideClick}
    >
      <Aboutdetails />
    </section>
  );
}
