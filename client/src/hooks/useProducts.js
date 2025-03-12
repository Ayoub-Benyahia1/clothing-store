import { useQuery } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.withCredentials = true;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Collect all products
export const useAllProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get(`${backendUrl}/products/all-products`);
      return data.products;
    },
  });

// Retrieve products with certain fields and a limit
export const useSpecificFieldsLimit = (fields) =>
  useQuery({
    queryKey: ["products", "specificFields", fields],
    queryFn: async () => {
      if (!fields.length) return []; // Prevents empty requests
      const { data } = await axios.get(
        `${backendUrl}/products/specific-fields?limit=6`,
        { params: { fields } }
      );
      return data.products;
    },
    enabled: !!fields.length, // Prevents query execution if fields is empty
  });

// Retrieve a product by ID
export const useProductById = (id) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/products/${id}`);
        return data.products || null;
      } catch (error) {
        console.error("Error fetching product:", error);
        throw new Error("Failed to fetch product");
      }
    },
    enabled: !!id, // Only run the query if `id` is set
  });

// Filter and sort products
export const useFilterAndSort = (queryParams) =>
  useQuery({
    queryKey: ["products", "filter", queryParams],
    queryFn: async () => {
      const { data } = await axios.get(`${backendUrl}/products/filter`, {
        params: queryParams,
      });
      return data.products;
    },
    enabled: !!queryParams, // Prevents execution if no parameters are set
  });
