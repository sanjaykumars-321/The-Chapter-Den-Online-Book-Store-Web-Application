import { useEffect, useRef, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { AddToCartClicked } from "../cart/cartSlice";
import { useAddToCart } from "../cart/useAddToCart";
import { useUser } from "../Auth/useUser";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCartLists } from "../cart/useCartLists";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BookDetail({ book }) {
  const navigate = useNavigate();
  const {
    book_name,
    author,
    book_type,
    copies_sold,
    description,
    first_published,
    image_back,
    image_front,
    latest_edition,
    price,
    theme,
    type,
  } = book;

  // const addToCartClicked = useSelector((store) => store.cart.addToCartClicked);

  const dispatch = useDispatch();

  const { insertToCart, isLoading } = useAddToCart();

  const { cartList } = useCartLists();

  const { user } = useUser();
  const quantity = 1;

  const book_id = book?.id;

  const user_id = user?.id;

  function handleAddToCart() {
    //
    //dispatch();

    // const cart = cartList?.find((cart) => cart.books.id === book_id);

    const userCartList = cartList?.filter((cart) => cart.user_id === user.id);
    const cart = userCartList?.find((cart) => cart.books.id === book_id);

    if (cart?.books?.id !== book_id) {
      insertToCart(
        { quantity, book_id, user_id, price },
        {
          onSuccess: () => {
            dispatch(AddToCartClicked(true));
            navigate("/books");
          },
        },
      );
    } else {
      toast.error("This book was already added to the cart.");
      dispatch(AddToCartClicked(true));
    }
  }

  // const { id: imageId } = useParams();

  const [imageBtn1, setImageBtn1] = useState(true);
  const [imageBtn2, setImageBtn2] = useState(false);

  const [imageLink, setImageLink] = useState(null);

  const imageBtnEl1 = useRef(null);
  const imageBtnEl2 = useRef(null);

  function handleImageBtn1() {
    setImageBtn1(true);
    setImageBtn2(false);
  }

  function handleImageBtn2() {
    setImageBtn2(true);
    setImageBtn1(false);
  }

  useEffect(
    function () {
      const imageDataBtn1 = imageBtnEl1.current.dataset.image;
      const imageDataBtn2 = imageBtnEl2.current.dataset.image;
      // if (id === Number(imageId)) setImageLink(imageDataBtn1);
      if (imageBtn1) setImageLink(imageDataBtn1);
      if (imageBtn2) setImageLink(imageDataBtn2);
    },
    [imageBtn1, imageBtn2, image_front],
  );

  const ActualPrice = price + (price / 100) * 70;

  function discountPercentage() {
    const discountAmount = ActualPrice - price;
    const percentage = (discountAmount / 600) * 100;
    return Math.ceil(percentage);
  }

  return (
    <>
      <div className="grid grid-cols-2 items-start justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-8 px-8 py-10">
          <div>
            <img
              src={imageLink}
              alt="book_image-front"
              className="h-[32rem] w-[23rem] rounded-lg shadow-lg shadow-gray-400"
            />
          </div>

          <div className="flex items-center justify-center gap-8">
            <button
              data-image={image_front}
              ref={imageBtnEl1}
              onClick={handleImageBtn1}
              className={`imageBtn ${imageBtn1 ? "border-[#FF7733]" : "border-gray-300"}`}
            >
              <img
                src={image_front}
                className="h-full w-full rounded-sm"
                alt="image_cover_front_button"
              />
            </button>

            <button
              data-image={image_back}
              ref={imageBtnEl2}
              onClick={handleImageBtn2}
              className={`imageBtn ${imageBtn2 ? "border-[#FF7733]" : "border-gray-300"}`}
            >
              <img
                src={image_back}
                className="h-full w-full rounded-sm"
                alt="image_cover_back_button"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center gap-8 px-8">
          <div className="flex flex-col items-start justify-start gap-8 px-8 py-8">
            <div className="flex flex-col items-start justify-center gap-8 text-[2.5rem] font-bold text-gray-900">
              <h1>{book_name}</h1>
              <p className="rounded-full bg-gray-100 px-4 py-2 text-center text-xl font-medium text-black shadow-inner">
                {book_type}
              </p>
              <p className="flex gap-4 text-base text-blue-950">
                <FaShoppingBag size={20} />{" "}
                <span>
                  Your order will be delivered within the next 24 hours.
                </span>
              </p>
            </div>
            <div className="flex items-center justify-center gap-8">
              <p className="text-[2.2rem] font-semibold text-gray-950">
                &#x20B9;{price}.00
              </p>
              <div className="flex items-center justify-center gap-4">
                <p className="text-base font-medium text-gray-600">
                  M.R.P.:{" "}
                  <span className="line-through">{`${ActualPrice}`}</span>
                </p>
                <p className="text-2xl font-normal text-red-600">{`-${discountPercentage()}% Discount`}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8">
              {/* <div
                className={`flex items-center justify-center gap-8 rounded-full border-[3px] transition-all ${!addToCartClicked ? "border-gray-400 bg-slate-200" : "border-[#FF9966]"} bg-white px-10 py-4`}
              >
                <button
                  className={`text-gray-900 ${!addToCartClicked ? "" : "hover:text-[#ff5500] active:text-[#ff5500]"} `}
                >
                  <AiOutlinePlus size={16} />
                </button>
                <p className="cursor-default text-xl font-normal text-gray-900">
                  1
                </p>
                <button
                  className={`text-gray-900 ${!addToCartClicked ? "" : "hover:text-[#ff5500] active:text-[#ff5500]"}`}
                >
                  <AiOutlineMinus size={16} />
                </button>
              </div> */}

              <button
                className="flex items-center justify-center gap-4 rounded-full bg-[#ff5500] px-[6.5rem] py-3 text-[1.4rem] font-semibold text-white outline-none transition-all hover:bg-[#E64D00] active:bg-[#E64D00]"
                onClick={handleAddToCart}
              >
                {isLoading ? (
                  <SpinnerMini />
                ) : (
                  <span className="flex items-center justify-center gap-4">
                    <IoCartOutline size={35} className="text-white" /> Add to
                    Cart
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="bookTableMainStyle grid grid-cols-2 items-center justify-center gap-8 rounded-lg border-2 border-gray-300">
            <div className="bookTableStyle">
              <p className="bookDetailStyle">
                Author: &nbsp; <br />
                <span className="bookDataStyle">{author}</span>
              </p>
            </div>

            <div className="bookTableStyle">
              <p className="bookDetailStyle">
                Book Type: &nbsp; <br />
                <span
                  className={`bookDataStyle ${type.replaceAll("-", "").toLowerCase() === "selfhelp" && "bg-green-800 text-white"} ${type.replaceAll("-", "").toLowerCase() === "fiction" && "bg-red-500 text-white"} ${type.replaceAll("-", "").toLowerCase() === "nonfiction" && "bg-gray-700 text-white"}`}
                >
                  {type}
                </span>
              </p>
            </div>

            <div className="bookTableStyle">
              <p className="bookDetailStyle">
                Theme: &nbsp; <br />
                <span className="bookDataStyle">{theme}</span>
              </p>
            </div>

            <div className="bookTableStyle">
              <p className="bookDetailStyle">
                First published: &nbsp;
                <br />
                <span className="bookDataStyle">{first_published}</span>
              </p>
            </div>

            <div className="bookTableStyle">
              <p className="bookDetailStyle">
                Copies sold: &nbsp;
                <br />
                <span className="bookDataStyle">{copies_sold}</span>
              </p>
            </div>

            <div className="bookTableStyle">
              <p className="bookDetailStyle">
                Latest edition: &nbsp;
                <br />
                <span className="bookDataStyle">
                  {latest_edition} {book_type}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8">
        <p className="bookDetailStyle flex w-full flex-col items-start gap-2 rounded-sm bg-[#fdf6f3] px-8 text-2xl shadow-none">
          Description of book: <br />
          <span className="bookDataStyle bg-[#fdf6f3] text-justify text-xl leading-[2.25rem]">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {description}
          </span>
        </p>
      </div>
    </>
  );
}

export default BookDetail;
