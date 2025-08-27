import{ create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useProductStore = create((set,get) => ({

    search:"",
    setSearch: (searchTerm) => set({ search: searchTerm }),

    products: [],
    isLoading: false,
    error: null,


    fetchProducts: async () => {

        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/api/products`, {
                withCredentials: true,
            });
            set({ products: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
    addProduct: async (newProduct) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/api/products`, newProduct, {
                withCredentials: true,
            });
            set((state) => ({
                products: [...state.products, response.data],
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },  
    updateProduct: async (updatedProduct) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(`${API_URL}/api/products/${updatedProduct._id}`, updatedProduct, {
                withCredentials: true,
            });
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === updatedProduct._id ? response.data : product
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
    deleteProduct: async (productId) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${API_URL}/api/products/${productId}`, {
                withCredentials: true,
            });
            set((state) => ({
                products: state.products.filter((product) => product._id !== productId),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    searchProduct:async (searchTerm) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/api/products/search?search=${searchTerm}`, {
                withCredentials: true,
            });
            console.log("response",response.data)
            return Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
            set({ error: error.message});
            throw error; 
        } finally {
            set({isloading:false})
        }

    },

    filteredProducts:() => {
    const { products, search } = get();
    if (!search) return products;
    return products.filter((p) =>
      Object.values(p).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase()))
    );
  },



}));


