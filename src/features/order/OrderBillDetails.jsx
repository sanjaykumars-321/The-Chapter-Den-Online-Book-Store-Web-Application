import { TiTick } from "react-icons/ti";
import { useUser } from "../Auth/useUser";
import { useOrder } from "./useOrder";
import Spinner from "../../ui/Spinner";
import {
  downloadBillReceipt,
  formateDate,
  formateDeliveryDate,
} from "../../utils/helper";
import { RiBillLine } from "react-icons/ri";
import { GrCart } from "react-icons/gr";
import { PiPackageFill } from "react-icons/pi";
import { FaRegFileAlt, FaRegMoneyBillAlt } from "react-icons/fa";

import { TbTruckDelivery } from "react-icons/tb";
import { useOutletContext } from "react-router-dom";
import logo from "../../../public/images/logo.png";

function OrderBillDetails() {
  const { handleOutsideClick } = useOutletContext();
  const { orderDetails, isLoading } = useOrder();
  const { user } = useUser();

  const orders = orderDetails?.map((orders) => orders);
  const userFilteredOrders = orders?.filter(
    (orders) => orders?.user_id === user?.id,
  );

  const sortingOrders = userFilteredOrders?.slice().sort((a, b) => b.id - a.id);

  const newOrder = sortingOrders?.at(0);

  const Tax = 0;
  const Delivery_charge = 0;

  return (
    <div>
      <section
        className="overflow-hidden px-[6.4rem] pb-[6.4rem] pt-[3.6rem]"
        onClick={handleOutsideClick}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-8">
            <div
              id="billReceipt"
              className="flex flex-col items-start justify-center gap-4 bg-[#FFEEE6] px-8 pb-[4.2rem] pt-8"
            >
              <div className="flex items-center justify-start gap-4">
                <img
                  src={logo}
                  alt="The Chapter Den Logo"
                  className="h-[5rem] w-[5rem]"
                />
                <h1 className="text-3xl font-medium text-gray-800">
                  The Chapter Den
                </h1>
              </div>

              <h1 className="flex items-center justify-start gap-2 text-lg font-medium text-gray-900">
                <TiTick size={30} className="text-green-600" />
                <span>
                  Order Placed Successfully! Thank you, {newOrder?.user_name}.
                  {`${newOrder?.delivered?.toLowerCase() === "no" ? " Your order will arrive soon." : "Your order delivered"}`}
                </span>
              </h1>

              <div className="flex w-full flex-col items-start justify-start gap-6 rounded-md bg-white px-12 py-8">
                <p className="m-auto flex items-center justify-center gap-2 border-b-2 border-[#FF9966] text-center text-lg font-semibold text-[#ff5500]">
                  <RiBillLine size={20} />
                  <span>Books Order Bill Receipt</span>
                </p>

                <div className="flex w-full flex-col items-start justify-start gap-4 border-b-2 border-gray-300 pb-10">
                  <p className="text-base font-normal text-gray-950">
                    <span className="font-semibold">Order ID:&nbsp;</span>{" "}
                    ORD-DEN
                    {newOrder?.id}
                  </p>
                  <p className="text-base font-normal text-gray-950">
                    <span className="font-semibold">Date:&nbsp;</span>{" "}
                    {formateDate(newOrder?.created_at)}
                  </p>
                  <p className="text-base font-normal text-gray-950">
                    <span className="font-semibold">Customer Name:&nbsp;</span>{" "}
                    {newOrder?.user_name}
                  </p>
                  <p className="text-base font-normal text-gray-950">
                    <span className="font-semibold">Payment Method:&nbsp;</span>{" "}
                    Cash on Delivery
                  </p>
                  <p className="text-base font-normal text-gray-950">
                    <span className="font-semibold">Delivery Type:&nbsp;</span>{" "}
                    Free Delivery
                  </p>
                </div>

                <p className="flex items-center justify-center gap-2 py-4 text-center text-lg font-semibold text-[#ff5500]">
                  <GrCart size={20} />
                  <span>Order Details</span>
                </p>

                <div className="flex w-full flex-col items-start justify-start gap-2 border-b-2 border-gray-300 pb-12">
                  <ul className="flex w-full flex-col gap-4 border-l-2 border-r-2 border-t-2 border-gray-300">
                    <li className="flex items-center justify-center gap-6 border-b-2 border-gray-300 px-4 py-4 text-base font-semibold text-gray-900">
                      <p className="w-[7rem] px-8">No.</p>
                      <p className="w-[15rem] px-4">Book Name</p>
                      <p className="w-[10rem] px-4">Book Type</p>
                      <p className="w-[10rem] px-4">Quantity</p>
                      <p className="w-[10rem] px-4">Price (&#x20B9;)</p>
                      <p className="w-[10rem] px-4">Subtotal (&#x20B9;)</p>
                    </li>

                    {newOrder?.ordered_books?.orderedBooks?.map(
                      (order, index) => (
                        <li
                          className="flex items-center justify-center gap-6 border-b-2 border-gray-300 px-4 py-4 text-base font-normal text-gray-900"
                          key={order.id}
                        >
                          <p className="w-[7rem] px-8">{index + 1}</p>
                          <p className="w-[15rem] px-4">
                            {order.books.book_name} &nbsp; (
                            {order.books.book_type})
                          </p>

                          <p className="w-[10rem] px-4">{order.books.type}</p>
                          <p className="w-[10rem] px-4">{order.quantity}</p>
                          <p className="w-[10rem] px-4">
                            &#x20B9;{order.per_book_price}
                          </p>
                          <p className="w-[10rem] px-4">
                            &#x20B9;{order.total_book_price}
                          </p>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <p className="flex items-center justify-center gap-2 py-4 text-center text-lg font-semibold text-[#ff5500]">
                  <FaRegMoneyBillAlt size={20} />
                  <span>Billing Summary</span>
                </p>

                <div className="flex w-full flex-col items-start justify-start gap-2 border-b-2 border-gray-300 pb-12">
                  <ul className="flex w-full flex-col border-l-2 border-r-2 border-t-2 border-gray-300">
                    <li className="flex items-center justify-center gap-6 border-b-2 border-gray-300 px-4 text-base font-semibold text-gray-900">
                      <p className="m-auto w-[15rem] border-r-2 py-4">
                        Description
                      </p>
                      <p className="m-auto w-[15rem] py-4">
                        Subtotal (&#x20B9;)
                      </p>
                    </li>
                    <li className="flex items-center justify-center gap-6 border-b-2 border-gray-300 px-4 text-base font-semibold text-gray-900">
                      <p className="m-auto w-[15rem] border-r-2 py-4">
                        Subtotal
                      </p>
                      <p className="m-auto w-[15rem] py-4 font-normal">
                        &#x20B9;{newOrder?.total_bill}
                      </p>
                    </li>
                    <li className="flex items-center justify-center gap-6 border-b-2 border-gray-300 px-4 text-base font-semibold text-gray-900">
                      <p className="m-auto w-[15rem] border-r-2 py-4">Tax</p>
                      <p className="m-auto w-[15rem] py-4 font-normal">
                        &#x20B9;{Tax}
                      </p>
                    </li>
                    <li className="flex items-center justify-center gap-6 border-b-2 border-gray-300 px-4 text-base font-semibold text-gray-900">
                      <p className="m-auto w-[15rem] border-r-2 py-4">
                        Delivery Charges
                      </p>
                      <p className="m-auto w-[15rem] py-4 font-normal">
                        &#x20B9;{Delivery_charge}
                      </p>
                    </li>
                    <li className="flex items-center justify-center gap-6 border-b-2 border-gray-300 px-4 text-base font-semibold text-gray-900">
                      <p className="m-auto w-[15rem] border-r-2 py-4">
                        Total Bill
                      </p>
                      <p className="m-auto w-[15rem] py-4">
                        &#x20B9;{newOrder?.total_bill}
                      </p>
                    </li>
                  </ul>
                </div>

                <p className="flex items-center justify-center gap-2 py-4 text-center text-lg font-semibold text-[#ff5500]">
                  <PiPackageFill size={20} />

                  <span>Shipping Details</span>
                </p>

                <div className="flex w-full flex-col items-start justify-start gap-4 border-b-2 border-gray-300 pb-8">
                  <p className="text-base font-normal text-gray-950">
                    <span className="font-semibold">Name:&nbsp;</span>
                    {newOrder?.user_name}
                  </p>
                  <p className="text-base font-normal text-gray-950">
                    <span className="font-semibold">
                      Delivery Address:&nbsp;
                    </span>{" "}
                    {newOrder?.address}
                  </p>
                  <p className="text-base font-normal text-gray-950">
                    <span className="font-semibold">Phone:&nbsp;</span> +91
                    &nbsp;
                    {newOrder?.phone_number}
                  </p>
                </div>

                <div className="flex w-full flex-col items-start justify-start gap-4 border-b-2 border-gray-300 pb-8">
                  <p className="flex text-base font-normal text-gray-950">
                    <span className="font-semibold">Order Status:&nbsp;</span>
                    <TiTick size={25} className="text-green-600" />
                    Order Placed Successfully
                  </p>
                  <p className="text-base font-normal text-gray-950">
                    <span className="font-semibold">
                      Expected Delivery Date:&nbsp;
                    </span>{" "}
                    {formateDeliveryDate(newOrder?.created_at)}
                  </p>
                  <p className="text-base font-normal text-gray-950">
                    <span className="font-semibold">Phone:&nbsp;</span> +91
                    &nbsp;
                    {newOrder?.phone_number}
                  </p>
                  <p className="text-lg font-medium text-[#ff5500]">
                    Thank you for ordering with us!
                  </p>
                  <div className="flex items-center justify-center gap-3 text-lg font-medium text-[#ff5500]">
                    <div>
                      <TbTruckDelivery size={25} />
                    </div>
                    <p>We always deliver your books for free.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="transition-all">
              <button
                className="flex items-center justify-center gap-2 rounded-full bg-[#ff5500] px-4 py-2 text-white hover:bg-[#E64D00] active:bg-[#E64D00]"
                onClick={() => downloadBillReceipt("billReceipt")}
              >
                <FaRegFileAlt size={20} />
                Download Bill Receipt
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default OrderBillDetails;
