import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../constant/url";

export const getMoviesWatchAgen = createAsyncThunk('moviesWatchAgen/getMoviesWatchAgen',async(thunkAPI)=>{
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=he`);
        return data;
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    moviesWatchAgen:[],
    loading : true,
    error : null
}

const watchAgenSlice = createSlice({
    name:'moviesWatchAgen',
    initialState,
    extraReducers:(builder)=>{
        builder 
        .addCase(getMoviesWatchAgen.pending ,(state,action) =>{
            state.loading = true;
        })
        .addCase(getMoviesWatchAgen.fulfilled,(state,action) =>{
            state.moviesWatchAgen = action.payload;
            state.loading = false;
        })
        .addCase(getMoviesWatchAgen.rejected,(state,action) =>{
            state.error = action.payload;
            state.loading = false;
        })
    },
    reducers:{}
})

export default watchAgenSlice.reducer;