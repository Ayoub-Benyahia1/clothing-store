import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.withCredentials = true;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Function to retrieve all sizes
const fetchSizes = async () => {
  const response = await axios.get(`${backendUrl}/sizes/all-sizes`);
  return response.data.sizes;
};

// Custom hook to retrieve sizes
export const useSizes = () => {
  return useQuery({
    queryKey: ["sizes"],
    queryFn: fetchSizes,
  });
};

// Add a size
export const useAddSize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${backendUrl}/sizes/add-size`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["sizes"]); // Refresh the size list after adding
    },
  });
};

// Update a size
export const useUpdateSize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.patch(
        `${backendUrl}/sizes/update-size`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["sizes"]); // Refresh sizes after update
    },
  });
};

// Delete a size
export const useDeleteSize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${backendUrl}/sizes/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["sizes"]); // Refresh sizes after deletion
    },
  });
};
