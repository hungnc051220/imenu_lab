import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  storeData: {},
};

const baseURl = import.meta.env.VITE_BASE_URL;

export const fetchStore = createAsyncThunk(
  "store/fetchStore",
  async ({ branchId }) => {
    const response = await axios.post(`${baseURl}/api/web/branch/check`, {
      branchId,
    });
    return response.data.data;
  }
);

export const storeSlice = createSlice({
  name: "store",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStore.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStore.fulfilled, (state, action) => {
      const { floors } = action.payload;
      const tables = floors.map((item) =>
        item.tables.map((table) => ({
          ...table,
          floorId: item.id,
          floorName: item.name,
        }))
      )
      const mergeTables = tables.flat(1).filter(x => x.status === false);
      state.storeData = { ...action.payload, tables: mergeTables };
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchStore.rejected, (state, action) => {
      state.loading = false;
      state.storeData = initialState.storeData;
      state.error = action.error.message;
    });
  },
});

export default storeSlice.reducer;
