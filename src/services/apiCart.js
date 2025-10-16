import { supabase } from "./supabase";

export const insertToCart = async function ({
  quantity,
  book_id,
  user_id,
  price,
}) {
  const { data, error } = await supabase
    .from("cart")
    .insert([
      {
        quantity,
        book_id,
        user_id,
        total_book_price: price,
        per_book_price: price,
      },
    ])
    .select();

  if (error) throw new Error("Could not to be add in cart");

  return data;
};

export const getCart = async function () {
  let { data: cart, error } = await supabase.from("cart").select(`
    id, quantity, user_id, total_book_price, per_book_price, 
    books (id, book_name, type, price, image_front, book_type)
  `);
  if (error) throw new Error("Could not to be load cart");
  return cart;
};

export const deleteItemCart = async function (id) {
  const { error } = await supabase.from("cart").delete().eq("id", id);

  if (error) throw new Error();
};

export const updateCart = async function ({ id, quantity, price }) {
  const { data, error } = await supabase
    .from("cart")
    .update({ quantity, total_book_price: price })
    .eq("id", id)
    .select();

  if (error) throw new Error("Could not to be update cart quantity and price");
  return data;
};
