import { supabase } from "./supabase";

export const createOrder = async function ({
  booksOrdered,
  total_bill,
  user_id,
  user_name,
  phone_number,
  email,
  address,
}) {
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        ordered_books: booksOrdered,
        total_bill,
        user_id,
        user_name,
        phone_number,
        email,
        address,
        delivered: "No",
      },
    ])
    .select();

  if (error) {
    throw new Error("could not to be place order now.");
  }

  return data;
};

export const OrderDetails = async function () {
  let { data: orders, error } = await supabase.from("orders").select("*");
  if (error) throw new Error("Could not to be load order details");
  return orders;
};

export const getOrderDetails = async function (id) {
  let { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id);
  if (error) throw new Error("Could not to be load order details");
  return orders;
};
