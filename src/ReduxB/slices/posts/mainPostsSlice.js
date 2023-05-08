import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const addPostAction = createAsyncThunk(
  "posts/",
  async (post, { rejectWithValue, getState, dispatch }) => {
    const { userAuth } = getState().users;
   
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        `https://givly-api.onrender.com/api/mainposts/${userAuth._id}`,
        post,
        config
      );
 
      await dispatch(fetchPostsAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deletePostAction = createAsyncThunk(
  "posts/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
  
    try {
      
      const { data } = await axios.delete(
        `https://givly-api.onrender.com/api/mainposts/deletepost/${id}`,
  
      );
      dispatch(fetchuserPostsAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const deletewishlistAction = createAsyncThunk(
  "posts/deletewishlist",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const { userAuth } = getState().users;
    try {
      
      const { data } = await axios.delete(
        `https://givly-api.onrender.com/api/mainposts/${userAuth._id}/wishlist/${id}`,
  
      );
      dispatch(fetchuserPostsAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updatePostAction = createAsyncThunk(
  "posts/update",
  async ({id,post}, { rejectWithValue, getState, dispatch }) => {

    try {
      
      const { data } = await axios.put(
        `https://givly-api.onrender.com/api/mainposts/${id}`,
        post  
      );
      dispatch(fetchuserPostsAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);






export const fetchPostsAction = createAsyncThunk(
  "posts/list",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { userAuth } = getState().users;
    try {
      const { data } = await axios.get(`https://givly-api.onrender.com/api/mainposts/getall/${userAuth._id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);
export const fetchPostsMatchedAction = createAsyncThunk(
  "postsMAtched/list",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { userAuth } = getState().users;
    try {
      const { data } = await axios.get(`https://givly-api.onrender.com/api/mainposts/Matchuser/${userAuth._id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);
export const fetchPostsTakenAction = createAsyncThunk(
  "postsTaken/list",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { userAuth } = getState().users;
    try {
      const { data } = await axios.get(`https://givly-api.onrender.com/api/mainposts/taken/takenuser/${userAuth._id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);
export const fetchuserPostsAction = createAsyncThunk(
  "postsuser/list",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { userAuth } = getState().users;
    try {
      const { data } = await axios.get(`https://givly-api.onrender.com/api/mainposts/userposts/${userAuth._id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);
export const addtowishlistAction = createAsyncThunk(
  "posts/towishlist",
  async ({id, _id}, { rejectWithValue, getState, dispatch }) => {

    try {
   
      const { data } = await axios.post(
        `https://givly-api.onrender.com/api/mainposts/${id}/wishlist`,
        {_id},
      );
  
      return data;
   
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);

export const getpostbyid = createAsyncThunk(
  "getbyid",
  async (id, { rejectWithValue, getState, dispatch }) => {

    try {
   
      const { data } = await axios.get(
        `https://givly-api.onrender.com/api/mainposts/${id}`,
      );
    
      return data;
   
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);
export const addmatches = createAsyncThunk(
  "addmatch",
  async (match, { rejectWithValue, getState, dispatch }) => {
  
    try {
    
      const { data } = await axios.post(
        `https://givly-api.onrender.com/api/mainposts/post/add/matches`,
        match
      );
   
      dispatch(getmatchesuser());
      return data;
   
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);
export const getmatchesuser = createAsyncThunk(
  "getmatchesuser",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { userAuth } = getState().users;
   

    try {
      const { data } = await axios.get(
        `https://givly-api.onrender.com/api/mainposts/getmatches/${userAuth._id}`
      );
    
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);
export const deleteMatchAction = createAsyncThunk(
  "posts/deletewishlist",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const { userAuth } = getState().users;
    try {
      
      const { data } = await axios.delete(
        `https://givly-api.onrender.com/api/mainposts/${userAuth._id}/matches/${id}`,
  
      );
      dispatch(fetchPostsMatchedAction());
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//////
export const updateafterscan = createAsyncThunk(
  "updateafterscan",
  async (datascan, { rejectWithValue, getState, dispatch }) => {
  
    try {
    
      const { data } = await axios.post(
        `https://givly-api.onrender.com/api/mainposts/update/afterscan`,
        datascan
      );

      dispatch(fetchPostsMatchedAction());
      return data;
   
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);

export const getgifts = createAsyncThunk(
  "getgift",
  async (_, { rejectWithValue, getState, dispatch }) => {
  const { userAuth } = getState().users;

  
    try {
    
      const { data } = await axios.get(
        `https://givly-api.onrender.com/api/gift/gift/${userAuth._id}`,
      );
      return data;
   
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error);
    }
  }
);






const mainPostsSlice = createSlice({
  name: "mainpost",
  initialState: {},
  extraReducers: (builder) => {
    //fetch posts
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.postLists = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //addtowishlist
    builder.addCase(addtowishlistAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addtowishlistAction.fulfilled, (state, action) => {
      state.Towishlist = action?.payload?.message;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(addtowishlistAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //getpostbyid
    builder.addCase(getpostbyid.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getpostbyid.fulfilled, (state, action) => {
      state.onepost = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getpostbyid.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //updatematches
    builder.addCase(addmatches.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addmatches.fulfilled, (state, action) => {
      state.matches = action?.payload;
    
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(addmatches.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //getfriendmatches
    builder.addCase(getmatchesuser.pending, (state, action) => {
      state.loading = true;
    });
    
    builder.addCase(getmatchesuser.fulfilled, (state, action) => {
      state.friendsmatch = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getmatchesuser.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //getuserspost fetchuserPostsAction
    builder.addCase(fetchuserPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    
    builder.addCase(fetchuserPostsAction.fulfilled, (state, action) => {
      state.usersposts = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchuserPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
     //getuserspost fetchuserMAtchPostsAction
     builder.addCase(fetchPostsMatchedAction.pending, (state, action) => {
      state.loading = true;
    });
    
    builder.addCase(fetchPostsMatchedAction.fulfilled, (state, action) => {
      state.usersmatchposts = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsMatchedAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //addpost
    builder.addCase(addPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addPostAction.fulfilled, (state, action) => {
      state.post = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(addPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //update
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.postuptated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //removefromwishlist
    builder.addCase(deletewishlistAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deletewishlistAction.fulfilled, (state, action) => {
      state.wishlistremoved = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deletewishlistAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetchPostsTakenAction
    builder.addCase(fetchPostsTakenAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsTakenAction.fulfilled, (state, action) => {
      state.taken= action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsTakenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //getgifts
    builder.addCase(getgifts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getgifts.fulfilled, (state, action) => {
      state.giftowned= action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getgifts.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    
  },
});

export default mainPostsSlice.reducer;
//getgifts