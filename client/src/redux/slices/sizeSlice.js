import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// CREATE SIZE
export const addSize = createAsyncThunk(
  "size/addSize",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendUrl}/sizes/add-size`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// GET ALL SIZES
export const allSizes = createAsyncThunk(
  "size/allSizes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/sizes/all-sizes`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// UPDATE SIZE
export const updateSize = createAsyncThunk(
  "size/updateSize",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${backendUrl}/sizes/update-size`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// DELETE SIZE
export const deleteSize = createAsyncThunk(
  "size/deleteSize",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${backendUrl}/sizes/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const sizeSlice = createSlice({
  name: "sizes",
  initialState: {
    sizes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSize.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSize.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload.sizes;
        state.error = null;
      })
      .addCase(addSize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(allSizes.pending, (state) => {
        state.loading = true;
      })
      .addCase(allSizes.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload.sizes;
        state.error = null;
      })
      .addCase(allSizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateSize.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSize.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload.sizes;
        state.error = null;
      })
      .addCase(updateSize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteSize.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSize.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload.sizes;
        state.error = null;
      })
      .addCase(deleteSize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default sizeSlice.reducer;
