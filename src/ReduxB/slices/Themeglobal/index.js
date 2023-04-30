import {createSlice} from "@reduxjs/toolkit"


const initialState={
    mode:"light"
};

export const globalthemeSlice= createSlice({
    name:"globaltheme",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode === "dark" ? "light":"dark" ;
        },
    },

})

export const {setMode}=globalthemeSlice.actions;
export default globalthemeSlice.reducer;

