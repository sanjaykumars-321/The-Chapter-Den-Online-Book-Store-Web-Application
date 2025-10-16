import { NavLink, useOutletContext } from "react-router-dom";
import homeImage from "../../public/images/hero-image.jpg";

function Home() {
  const { sectionEl, handleOutsideClick } = useOutletContext();

  return (
    <section
      className="overflow-hidden px-10 pt-[6.4rem]"
      ref={sectionEl}
      onClick={handleOutsideClick}
    >
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-12">
          <h1 className="text-6xl font-semibold tracking-tight text-gray-950">
            Every Great Story Begins with a Chapter
          </h1>
          <p className="text-2xl font-normal text-gray-700">
            “ Where books turn into worlds, and every story waits for you to
            explore ”
          </p>

          <NavLink
            className="rounded-full bg-[#ff5500] px-8 py-3 text-2xl font-semibold text-white transition-all hover:bg-[#E64D00] active:bg-[#E64D00]"
            to="/books"
          >
            Order Your Book
          </NavLink>
        </div>

        <div className="w-screen">
          <img src={homeImage} alt="the books on the table" />
        </div>
      </div>
    </section>
  );
}

export default Home;
