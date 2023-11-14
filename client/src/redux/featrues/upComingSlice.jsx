import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../constant/url";

export const getMoviesUpComing = createAsyncThunk('moviesUpComing/getMoviesUpComing',async(thunkAPI)=>{
    try {
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=he`);
        return data;
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    moviesUpComing:[],
    loading : true,
    error : null,
}

const upComingSlice = createSlice({
    name:'moviesUpComing',
    initialState,
    extraReducers:(builder)=>{
        builder 
        .addCase(getMoviesUpComing.pending ,(state,action) =>{
            state.loading = true;
        })
        .addCase(getMoviesUpComing.fulfilled,(state,action) =>{
            state.moviesUpComing = action.payload;
            state.loading = false;
        })
        .addCase(getMoviesUpComing.rejected,(state,action) =>{
            state.error = action.payload;
            state.loading = false;
        })
    },
    reducers:{
    }
})

export default upComingSlice.reducer;