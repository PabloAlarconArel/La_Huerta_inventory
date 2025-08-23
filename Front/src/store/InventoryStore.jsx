import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useInventoryStore = create((set, get) => ({
    
    search: "",
    setSearch: (searchTerm) => set({ search: searchTerm }),

    inventory: [],
    isLoading: false,
    error: null,

    fetchInventory: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/api/inventory`, {
                withCredentials: true,
            });
            set({ inventory: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
    addInventoryItem: async (newItem) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/api/inventory`, newItem, {
                withCredentials: true,
            });
            set((state) => ({
                inventory: [...state.inventory, response.data],
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
    updateInventoryItem: async (updatedItem) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(`${API_URL}/api/inventory/${updatedItem._id}`, updatedItem, {
                withCredentials: true,
            });
            set((state) => ({
                inventory: state.inventory.map((item) =>
                    item._id === updatedItem._id ? response.data : item
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
    deleteInventoryItem: async (itemId) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${API_URL}/api/inventory/${itemId}`, {
                withCredentials: true,
            });
            set((state) => ({
                inventory: state.inventory.filter((item) => item._id !== itemId),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
    
    filteredInventories: () => {
    const { inventory, search } = get();
    if (!search) return inventory;
    return inventory.filter((p) =>

        Object.values(p).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()))
    );
    },
    
}));