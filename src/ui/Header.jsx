import { useEffect, useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";

function Header({ sectionEl, modalClose }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const section = sectionEl.current;
    if (!section) return;
    let sectionCoords = section.getBoundingClientRect().top;

    const handleScroll = () => {
      // You can adjust 100 to the scroll point where header should stick

      setIsSticky(window.scrollY > sectionCoords);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionEl]);

  return (
    <>
      <header
        className={`z-50 flex items-center justify-between px-16 py-2 ${isSticky ? "fixed top-0 w-full bg-white shadow-sm shadow-[#FFCCB3]" : ""}`}
        onClick={modalClose}
      >
        <Logo />
        <Navigation />
      </header>
    </>
  );
}

export default Header;
