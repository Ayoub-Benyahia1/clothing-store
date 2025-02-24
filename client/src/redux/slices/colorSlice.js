import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// CREATE COLOR
export const addColor = createAsyncThunk(
  "color/addColor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/colors/add-color`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// GET ALL COLORS
export const allColors = createAsyncThunk(
  "color/allColor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendUrl}/colors/all-colors`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// UPDATE COLOR
export const updateColor = createAsyncThunk(
  "color/updateColor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${backendUrl}/colors/update-color`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// DELETE COLOR
export const deleteColor = createAsyncThunk(
  "color/deleteColor",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/colors/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    colors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addColor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload.colors;
        state.error = null;
      })
      .addCase(addColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(allColors.pending, (state) => {
        state.loading = true;
      })
      .addCase(allColors.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload.colors;
        state.error = null;
      })
      .addCase(allColors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateColor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload.colors;
        state.error = null;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteColor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload.colors;
        state.error = null;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default colorSlice.reducer;
