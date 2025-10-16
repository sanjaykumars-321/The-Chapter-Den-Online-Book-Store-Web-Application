import { useBook } from "./useBook";
import Spinner from "../../ui/Spinner";

import ErrorFallback from "../../ui/ErrorFallback";
import { useOutletContext } from "react-router-dom";
import BookDetail from "./BookDetail";

function Book() {
  const { handleOutsideClick } = useOutletContext();
  const { isLoading, book, error } = useBook();

  if (isLoading) return <Spinner />;

  if (error) return <ErrorFallback error={error.message} />;

  return (
    <section
      className="overflow-hidden px-[2rem] py-[1.4rem]"
      onClick={handleOutsideClick}
    >
      <BookDetail book={book} />
    </section>
  );
}

export default Book;
