import { supabase } from "./supabase";

export const login = async function ({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
};

export const getCurrentUser = async function () {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
};

export const logout = async function () {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const signUp = async function ({
  fullName,
  email,
  password,
  phoneNumber,
  doorNoStreet,
  landMark,
  city,
  pinCode,
  state,
}) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        phoneNumber,
        doorNoStreet,
        landMark,
        city,
        pinCode,
        state,
      },
    },
  });

  if (error) throw new Error(error.message || "Signup failed");

  return data;
};

export const updateUser = async function ({
  email,
  password,
  fullName,
  phoneNumber,
  doorNoStreet,
  landMark,
  city,
  pinCode,
  state,
}) {
  const { data, error } = await supabase.auth.updateUser({
    email: email,
    password: password,
    data: {
      fullName,
      phoneNumber,
      doorNoStreet,
      landMark,
      city,
      pinCode,
      state,
    },
  });

  if (error) throw new Error(error.message);

  // console.log(data);

  return data;
};

export const forgotPassword = async function (email) {
  let { data: forgotPassword, error } =
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        "https://the-chapter-den-online-store.netlify.app/updatePassword",
    });

  if (error) throw new Error(error.message);

  return { forgotPassword };
};

export const updatePassword = async function ({ newPassword }) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);

  // console.log(data);

  return data;
};

// export const updateActive = async function () {
//   const { data, error } = await supabase.auth.updateUser({
//     data: {
//       isAlive: "false",
//     },
//   });

//   if (error) throw new Error(error.message);

//   return data;
// };
