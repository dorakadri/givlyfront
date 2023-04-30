import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const resetUserAction = createAction("user/profile/reset");

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "https://givly-api.onrender.com/api/users/register",
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//login
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.post(
        "https://givly-api.onrender.com/api/users/login",
        userData,
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          dispatch(updateuserlocation(location)); 
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      return data;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const updateuserlocation = createAsyncThunk(
  "location",
  async (location, { rejectWithValue, getState, dispatch }) => {

const { userAuth } = getState().users;

   console.log( userAuth)

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.put(
        `https://givly-api.onrender.com/api/Delivery/updatelocation/${userAuth._id}`,
        { location: location },
        config
      );
      return data ;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  })
//logout action
//Block User
export const banUserAction = createAsyncThunk(
  "user/block",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `https://givly-api.onrender.com/api/users/ban-user/${id}`,
        {},
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//unBlock User
export const unbanUserAction = createAsyncThunk(
  "user/unblock",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `https://givly-api.onrender.com/api/users/unban-user/${id}`,
        {},
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      // Call the backend API to update the user's status to "offline"
      await axios.put(
        "https://givly-api.onrender.com/api/users/status",

        { status: "offline" },
        config
      );

      // Remove the user from localStorage
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const passwordResetTokenAction = createAsyncThunk(
  "password/token",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `https://givly-api.onrender.com/api/users/forget-password-token`,
        { email },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const passwordResetAction = createAsyncThunk(
  "password/reset",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        `https://givly-api.onrender.com/api/users/reset-password`,
        { password: user?.password, token: user?.token },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await axios.put(
        `https://givly-api.onrender.com/api/users`,
        {
          lastName: userData?.lastName,
          firstName: userData?.firstName,
          bio: userData?.bio,
          email: userData?.email,
          profilePhoto: userData?.profilePhoto,
          associationName: userData?.associationName,
          associationAdress: userData?.associationAdress,
          associationPhone: userData?.associationPhone,
        },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
// Profile
export const userProfileAction = createAsyncThunk(
  "user/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    console.log(userAuth);
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(
        `https://givly-api.onrender.com/api/users/profile/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get user from local storge
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
    newMessages: {},

  },
  reducers: {
    addNotifications: (state, { payload }) => {
      if (state.newMessages[payload]) {
        state.newMessages[payload] = state.newMessages[payload] + 1;
   
      } else {
        state.newMessages[payload] = 1;
 
      }
    },
    resetNotifications: (state, { payload }) => {
      delete state.newMessages[payload];
      
    },
  },

  extraReducers: (builder) => {
    //update location
    builder.addCase(updateuserlocation.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateuserlocation.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedloc = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;


    });
    builder.addCase(updateuserlocation.rejected, (state, action) => {

      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //login slice
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //Block user
    builder.addCase(banUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(banUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.block = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(banUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //unBlock user
    builder.addCase(unbanUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unbanUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.unblock = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unbanUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = false;
      console.log(state);
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      console.log(state);
      state.userAuth = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      console.log(state);
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
      console.log(state);
    });

    //Profile
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });

    //update
    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetUserAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userUpdated = action?.payload;
      state.isUpdated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //PAssword Reset Token
    builder.addCase(passwordResetTokenAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordToken = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Password reset
    builder.addCase(passwordResetAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordReset = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});
const userslist = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    addNotifications: (state, { payload }) => {
      if (state.newMessages[payload]) {
        state.newMessages[payload] = state.newMessages[payload] + 1;
      } else {
        state.newMessages[payload] = 1;
      }
    },
    resetNotifications: (state, { payload }) => {
      delete state.newMessages[payload];
    },
  },

  extraReducers: (builder) => {
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //login slice
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
    //Block user
    builder.addCase(banUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(banUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.block = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(banUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //unBlock user
    builder.addCase(unbanUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unbanUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.unblock = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(unbanUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = false;
      console.log(state);
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      console.log(state);
      state.userAuth = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      console.log(state);
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
      console.log(state);
    });

    //Profile
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });

    //update
    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetUserAction, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userUpdated = action?.payload;
      state.isUpdated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //PAssword Reset Token
    builder.addCase(passwordResetTokenAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordToken = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Password reset
    builder.addCase(passwordResetAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.passwordReset = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(passwordResetAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});
export const { addNotifications, resetNotifications } = usersSlices.actions;
export default usersSlices.reducer;
export const userslistt = userslist.reducer;
