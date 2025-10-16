import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function BooksLists({ book }) {
  const { id, book_name, image_front, type, price } = book;

  return (
    <>
      <li className="flex flex-col items-center justify-center gap-[1rem] rounded-2xl bg-white px-[1.6rem] py-[3.6rem] shadow-[0px_3px_8px_rgba(0,0,0,0.24)]">
        <img
          src={image_front}
          className="h-[19rem] w-[14rem] rounded-xl shadow-md shadow-gray-400"
          alt="book_image"
        />
        <h1 className="mt-4 text-center text-xl font-semibold text-gray-900">
          {book_name}
        </h1>
        <p
          className={`rounded-lg px-4 py-2 text-[1rem] font-[450] text-gray-600`}
        >
          {type}
        </p>
        <h3 className="rounded-md bg-[#FFEEE6] px-6 py-1 text-lg font-[550] text-[#ff5500] shadow-inner">
          &#x20B9;{price}
        </h3>
        <Link
          to={`${id}`}
          className="flex items-center justify-center gap-3 rounded-full bg-[#ff5500] px-16 py-3 text-[1.3rem] font-semibold text-white transition-all hover:bg-[#E64D00] active:bg-[#E64D00]"
        >
          <IoCartOutline size={30} className="text-white" />
          Add To Cart
        </Link>
      </li>
    </>
  );
}

export default BooksLists;
