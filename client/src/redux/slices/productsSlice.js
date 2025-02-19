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

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    filterAndSortByOrder: (state) => {
      let filteredProducts = [...state.products]; // Clone products array

      // Apply Price Filter
      const minPrice = state.filters["price_min"]
        ? Number(state.filters["price_min"])
        : 0;
      const maxPrice = state.filters["price_max"]
        ? Number(state.filters["price_max"])
        : Infinity;

      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );

      // Apply Category Filter
      if (state.filters.category) {
        filteredProducts = filteredProducts.filter((product) =>
          state.filters.category.includes(product.category)
        );
      }

      // Apply Gender Filter
      if (state.filters.gender) {
        filteredProducts = filteredProducts.filter((product) =>
          state.filters.gender.includes(product.gender)
        );
      }

      // Apply Size Filter
      if (state.filters.size) {
        filteredProducts = filteredProducts.filter((product) =>
          product.sizes.some((size) => state.filters.size.includes(size))
        );
      }

      // Apply Color Filter
      if (state.filters.color) {
        filteredProducts = filteredProducts.filter((product) =>
          state.filters.color.includes(product.color)
        );
      }

      // Apply Sorting
      if (state.filters.sort_by) {
        filteredProducts.sort((a, b) => {
          if (state.filters.sort_by === "price") {
            return state.filters.order === "asc"
              ? a.price - b.price
              : b.price - a.price;
          }
          if (state.filters.sort_by === "name") {
            return state.filters.order === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          }
          return 0; // Default case (no sorting)
        });
      }

      // Update state with filtered and sorted products
      state.filteredProducts = filteredProducts;
    },
  },
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
      });
  },
});

export const { updateFilters, filterAndSortByOrder } = productSlice.actions;
export default productSlice.reducer;
