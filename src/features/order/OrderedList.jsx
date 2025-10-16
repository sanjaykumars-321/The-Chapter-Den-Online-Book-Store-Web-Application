import { Link, useOutletContext } from "react-router-dom";
import ErrorFallback from "../../ui/ErrorFallback";
import Spinner from "../../ui/Spinner";
import { formateDate, formateDeliveryDate } from "../../utils/helper";
import { useUser } from "../Auth/useUser";
import EmptyOrder from "./EmptyOrder";
import { useOrder } from "./useOrder";
import { PiPackageDuotone } from "react-icons/pi";

function OrderedList() {
  const { orderDetails, isLoading, error } = useOrder();
  const { user } = useUser();

  const { handleOutsideClick } = useOutletContext();

  const orders = orderDetails?.map((orders) => orders);
  const userFilteredOrders = orders?.filter(
    (orders) => orders?.user_id === user?.id,
  );

  const sortingOrders = userFilteredOrders?.slice().sort((a, b) => b.id - a.id);
  console.log(sortingOrders);

  if (isLoading) return <Spinner />;

  if (error) return <ErrorFallback />;

  return (
    <section
      className="overflow-hidden px-[6.4rem] pb-[6.4rem] pt-[2rem]"
      onClick={handleOutsideClick}
    >
      {sortingOrders.length === 0 ? (
        <EmptyOrder />
      ) : (
        <div className="flex w-full flex-col items-start justify-center gap-12">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-semibold text-[#ff5500]">
            <PiPackageDuotone size={40} />
            Your orders are here
          </h1>
          {sortingOrders?.map((order) => (
            <div
              key={order?.id}
              className="grid grid-cols-2 items-center justify-center gap-6 rounded-lg px-4 py-4 shadow-[0px_3px_8px_rgba(0,0,0,0.24)]"
            >
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 px-4 py-4">
                <p className="text-lg font-bold text-gray-900">
                  Order ID:{" "}
                  <span className="font-normal">ORD-DEN{order?.id}</span>
                </p>
                <p className="text-lg font-bold text-gray-900">
                  Date Ordered:{" "}
                  <span className="font-normal">
                    {formateDate(order?.created_at)}
                  </span>
                </p>
                <p className="text-lg font-bold text-gray-900">
                  Delivery Date:{" "}
                  <span className="font-normal">
                    {formateDeliveryDate(order?.created_at)}
                  </span>
                </p>
                <p className="text-lg font-bold text-gray-900">
                  Delivery Status:{" "}
                  <span className="font-normal">
                    Your Order is&nbsp;
                    {`${order?.delivered?.toLowerCase() === "no" ? "on the way" : "delivered"}`}
                  </span>
                </p>
                <p className="text-lg font-bold text-gray-900">
                  Total Bill:{" "}
                  <span className="font-normal">{order?.total_bill}</span>
                </p>

                <Link
                  to={`${order?.id}`}
                  className="rounded-full bg-[#ff5500] px-8 py-2 text-lg font-bold text-white hover:bg-[#E64D00] active:bg-[#E64D00]"
                >
                  View bill Receipt
                </Link>
              </div>

              <div className="flex flex-col items-center justify-center">
                {order?.ordered_books?.orderedBooks?.map((bookOrder, index) => (
                  <div
                    key={index}
                    className="flex w-[40rem] items-center gap-8 px-4 py-4"
                  >
                    <div>
                      <img
                        className="h-[6rem] w-[4rem] rounded-md"
                        src={bookOrder?.books?.image_front}
                        alt="books_image"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start gap-4 text-lg text-gray-900">
                      <div className="flex gap-4">
                        <p>{bookOrder?.books?.book_name}</p>
                        <p>&times;</p>
                        <p>{bookOrder?.quantity}</p>
                      </div>
                      <p className="flex gap-2 text-base font-bold text-gray-900">
                        Per book price:
                        <span className="font-normal">
                          {bookOrder?.per_book_price}
                        </span>
                      </p>
                      <p className="flex gap-2 text-base font-bold text-gray-900">
                        Subtotal:
                        <span className="font-normal">
                          {bookOrder?.total_book_price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
export default OrderedList;
