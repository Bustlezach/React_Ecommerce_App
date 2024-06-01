import { createSlice } from "@reduxjs/toolkit";

const stripeSlice = createSlice({
  name: "stripe",
  initialState: {
    stripeData: {},
  },
  reducers: {
    addStripe: (state, action) => {
      state.stripeData = action.payload
    }
  },
});

export const { addStripe } = stripeSlice.actions;
export default stripeSlice.reducer;