import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    UserModalClicked(state) {
      state.userModal = !state.userModal;
    },
    UserModalClicked2(state, action) {
      state.userModal = action.payload;
    },
  },
});

export const { UserModalClicked, UserModalClicked2 } = modalSlice.actions;
export default modalSlice.reducer;
