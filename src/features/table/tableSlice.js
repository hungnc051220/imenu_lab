import { createSlice } from "@reduxjs/toolkit";

const initialState = sessionStorage.getItem("table")
  ? JSON.parse(sessionStorage.getItem("table"))
  : {};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      const { floorId, floorName, tableId, tableName } = action.payload;
      state.floorId = floorId;
      state.floorName = floorName;
      state.tableId = tableId;
      state.tableName = tableName;
      sessionStorage.setItem("table", JSON.stringify(action.payload));
    },
  },
});

export const { setTable } = tableSlice.actions;
export default tableSlice.reducer;
