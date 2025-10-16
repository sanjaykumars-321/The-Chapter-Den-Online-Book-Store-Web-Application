import { supabase } from "./supabase";

export const getBooks = async function () {
  let { data: books, error } = await supabase.from("books").select("*");

  if (error) throw new Error("Books could not be loaded");
  return books;
};

export const getBooksLabels = async function () {
  let { data: booksLabels, error } = await supabase
    .from("books")
    .select("id,book_name,price,type,image_front");

  if (error) throw new Error("Books could not be loaded");
  return booksLabels;
};

export const getBook = async function (id) {
  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error("Book could not be loaded");
  return book;
};
