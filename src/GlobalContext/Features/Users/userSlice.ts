'use client'
import axios from "axios"
import Cookies from 'js-cookie';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface user {
    id: number,
    name: string,
    email: string,
    password: string,
    city: string,
    phone: string
}

interface state {
    user: Partial<user>,
    loggedIn: boolean;
}


const initialState: state = {
    user: {},
    loggedIn: false
}

export const login = createAsyncThunk(
    "User/Login",
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                if (data[i].email === email && data[i].username === password) {
                    return data[i];
                }
            }
            return rejectWithValue('Usuario no encontrado');
        } catch (err) {
            console.error(`Error iniciando sesión: ${err}`);
            return rejectWithValue('Error en la conexión');
        }
    }
);


const userSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {};
            Cookies.remove("USER");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload != false) {
                state.user = action.payload;
                Cookies.set("USER", JSON.stringify(action.payload), { expires: 7 });
            }
        });
    }
})


export const { logout } = userSlice.actions;
export default userSlice.reducer;