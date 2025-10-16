import { useOutletContext, useSearchParams } from "react-router-dom";

import { useBooksLabels } from "../features/booksList/useBooksLabels";
import BooksLists from "../features/booksList/BooksLists";
import Spinner from "../ui/Spinner";
import ErrorFallback from "../ui/ErrorFallback";
import { FiSearch } from "react-icons/fi";
import { PiBooksFill } from "react-icons/pi";
import { useEffect, useState } from "react";

function Books() {
  const { sectionEl, handleOutsideClick } = useOutletContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const [filterValue, setFilterValue] = useState("");
  const [bookSearch, setBookSearch] = useState("");

  const handleFilterBtn = function (value) {
    setFilterValue(value);
  };

  const filterName = searchParams.get("filter");

  useEffect(
    function () {
      if (filterValue !== "") searchParams.set("filter", filterValue);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams, filterValue],
  );

  const optionsFilter = [
    {
      value: "all",
      Label: "All",
    },
    {
      value: "self-help",
      Label: "Self-Help",
    },
    {
      value: "fiction",
      Label: "Fiction",
    },
    {
      value: "non-fiction",
      Label: "Non-Fiction",
    },
  ];

  function handleSearch(value) {
    setBookSearch(value);
  }

  const { isLoading, booksLabels, error } = useBooksLabels();

  const filteredBooks = booksLabels?.filter(
    (book) => book.type.toLowerCase() === filterName,
  );

  const booksList = filteredBooks?.length === 0 ? booksLabels : filteredBooks;

  const searchBookList = booksList?.filter((book) => {
    const lengthOfSearch = Number(bookSearch.length);

    return (
      book.book_name.toLowerCase().slice(0, lengthOfSearch) ===
      bookSearch.toLowerCase()
    );
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error.message} />;

  return (
    <section
      className="flex flex-col items-center justify-center gap-12 overflow-hidden px-[6.4rem] pb-[6.4rem] pt-[3.6rem]"
      ref={sectionEl}
      onClick={handleOutsideClick}
    >
      <div className="flex w-full items-center justify-between gap-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center gap-4">
            <label
              htmlFor="searchBooks"
              className="flex gap-2 text-lg font-semibold text-gray-900"
            >
              <PiBooksFill size={30} />
              Explore Books :
            </label>
            <div className="relative transition-all">
              <input
                type="text"
                id="searchBooks"
                name="searchBooks"
                onChange={(e) => handleSearch(e.target.value)}
                className="h-[3rem] w-[25rem] rounded-full border-2 border-[#ff5500] py-2 pl-[4rem] pr-4 text-gray-950 outline-none focus:bg-[#FFEEE6]"
              />

              <div className="absolute left-0 top-0 h-[3rem] items-center justify-center rounded-l-full bg-[#ff5500] px-4 py-[0.9rem] text-white">
                <FiSearch size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 rounded-xl border-2 border-[#FF9966] bg-[#FFEEE6] px-4 py-2 text-lg font-medium">
          {optionsFilter.map((option, i) => (
            <button
              className={`rounded-xl px-4 py-2 ${option.value === filterValue ? "bg-[#ff5500] text-white" : ""} ${filterValue === "" && option.value === "all" ? "bg-[#ff5500] text-white" : ""}`}
              onClick={() => handleFilterBtn(option.value)}
              key={i}
            >
              {option.Label}
            </button>
          ))}
        </div>
      </div>
      <ul className="grid grid-cols-3 items-center justify-center gap-[8rem]">
        {searchBookList.map((book) => {
          return <BooksLists key={book.id} book={book} />;
        })}
      </ul>
    </section>
  );
}

export default Books;
