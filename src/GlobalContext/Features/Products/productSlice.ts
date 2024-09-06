import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getproducts = createAsyncThunk(
    "Products/getProducts",
    async () => {
        const response: any = await axios.get('https://dummyjson.com/products');
        return response.data;
    }
);

export const getproductById = createAsyncThunk(
    "Products/getProductById",
    async (productId: string, { rejectWithValue }) => {
        try {
            const response: any = await axios.get(`https://dummyjson.com/products/${productId}`);
            return response.data;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

export const searchProducts = createAsyncThunk(
    "Products/searchProducts",
    async (inputValue: string, { rejectWithValue }) => {
        try {
            const response: any = await axios.get(`https://dummyjson.com/products/search?q=${inputValue}`);
            return response.data;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

const initialState = {
    products: [],
    product: {},
    loading: false,
    error: ""
};

const productSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getproducts.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getproducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.error = "";
            })
            .addCase(getproducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getproductById.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getproductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
                state.error = "";
            })
            .addCase(getproductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.error = "";
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {} = productSlice.actions;
export default productSlice.reducer;
