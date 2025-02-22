import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// GET ALL PRODUCTS
export const allProducts = createAsyncThunk(
  "products/allProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/products/all-products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// GET SPECIFIC FIELDS PRODUCTS WITH LIMIT
export const specificFieldsLimit = createAsyncThunk(
  "products/specificFieldsLimit",
  async (fields, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendUrl}/products/specific-fields?limit=6`,
        { params: { fields } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

// GET FILTER AND SORT BY ORDER
export const filterAndSort = createAsyncThunk(
  "products/filterAndSortByOrder",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/products/filter`, {
        params: query,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.error);
    }
  }
);

// GET PRODUCT BY ID
export const productById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.error = null;
      })
      .addCase(allProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(specificFieldsLimit.pending, (state) => {
        state.loading = true;
      })
      .addCase(specificFieldsLimit.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.error = null;
      })
      .addCase(specificFieldsLimit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(filterAndSort.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterAndSort.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.error = null;
      })
      .addCase(filterAndSort.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload;
      })
      .addCase(productById.pending, (state) => {
        state.loading = true;
      })
      .addCase(productById.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.error = null;
      })
      .addCase(productById.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
