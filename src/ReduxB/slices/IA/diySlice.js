import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const diyGenerationAction = createAsyncThunk(
    "diy",
    async (object, { rejectWithValue, getState, dispatch }) => {
      try {
        const { data } = await axios.get(" https://givly-api.onrender.com/api/diy/"+object);
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error);
      }
    }
  );

  const DiySlice = createSlice({
    name: "diy",
    initialState: {},
    extraReducers: (builder) => {
        //fetch posts
        builder.addCase(diyGenerationAction.pending, (state, action) => {
          state.loading = true;
        });
        builder.addCase(diyGenerationAction.fulfilled, (state, action) => {
          state.diylist = action?.payload;
          state.loading = false;
          state.appErr = undefined;
          state.serverErr = undefined;
        });
        builder.addCase(diyGenerationAction.rejected, (state, action) => {
          state.loading = false;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
        });

    }

  })


  
export default DiySlice.reducer;