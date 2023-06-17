const { createSlice } = require("@reduxjs/toolkit");

const initialState = "";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    resetSearch: () => initialState,
    changeSearch: (state, { payload }) => payload,
  },
});

export const { resetSearch, changeSearch } = searchSlice.actions;

export default searchSlice.reducer;
