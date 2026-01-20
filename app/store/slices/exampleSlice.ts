import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {
  value: number;
};

const initialState: ExampleState = {
  value: 0
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    }
  }
});

export const { increment, decrement, incrementByAmount, reset } = exampleSlice.actions;
export default exampleSlice.reducer;