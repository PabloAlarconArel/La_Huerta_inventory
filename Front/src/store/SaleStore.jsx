import{ create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useSaleStore = create((set,get) => ({

    search:"",
    setSearch: (searchTerm) => set({ search: searchTerm }),

    sales: [],
    dateSales:[],
    isLoading: false,
    error: null,


    fetchSales: async () => {

        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/api/sales`, {
                withCredentials: true,
            });
            set({ sales: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
    addSale: async (newSale) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/api/sales`, newSale, {
                withCredentials: true,
            });
            set((state) => ({
                dateSales: [...state.sales, response.data],
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },  
    dateSale: async (init,end)=>{
        set({ isLoading: true, error: null });
        try{
            const response =await axios.get(`${API_URL}/api/sales/date?init=${init}&end=${end}`,{
                withCredentials: true
            });
            console.log(response.data)
            console.log('es arreglo', Array.isArray(response.data))
            return response.data;
        }
        catch(error){
            set({error: error.message, isLoading:false});
        }


    },
    deleteSale: async (saleId) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${API_URL}/api/sales/${saleId}`, {
                withCredentials: true,
            });
            set((state) => ({
                sales: state.sales.filter((sale) => sale._id !== saleId),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    filteredSale:(search) => {
    const { sales } = get();
    if (!search) return sales;
    return sales.filter((p) =>
      Object.values(...p,...p.product).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase()))
    );
  },

}));