import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";




export const deliveryAction = createAsyncThunk(
  "delivery",
  async (delivery, { rejectWithValue, getState, dispatch }) => {

const { userAuth } = getState().users;
const { profile} = getState().users;

const data= {...delivery,user:userAuth._id,locationUser:profile.location}


    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data1 } = await axios.post(
        "https://givly-api.onrender.com/api/Delivery",
        data,
        config
      );
      return data1; 
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  })
  

  export const deliverygetAction = createAsyncThunk(
    "deliveryget",
    async (_, { rejectWithValue, getState, dispatch }) => {
      const { userAuth } = getState().users;
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.get(
          `https://givly-api.onrender.com/api/Delivery/${userAuth._id}`,
          
          config
        );
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    },)

    export const deliverydeleteAction = createAsyncThunk(
        "deliverydelete",
        async (_id, { rejectWithValue, getState, dispatch }) => {

          try {
            const config = {
              headers: { "Content-Type": "application/json" },
            };
            const { data } = await axios.delete(
              `https://givly-api.onrender.com/api/Delivery/${_id}`,
             
              config
            );
            return data;
          } catch (error) {
            if (!error?.response) {
              throw error;
            }
            return rejectWithValue(error?.response?.data);
          }
        },)

////create transaction
export const transactionAction = createAsyncThunk(
  "transaction",
  async (transaction, { rejectWithValue, getState, dispatch }) => {


    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data1 } = await axios.post(
        "https://givly-api.onrender.com/api/Transaction/"+transaction,
        config
      );
      return data1; 
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },)

        export const deliverygetOneAction = createAsyncThunk(
          "deliverygetOne",
          async (_id, { rejectWithValue, getState, dispatch }) => {
  
            try {
              const config = {
                headers: { "Content-Type": "application/json" },
              };
              const { data } = await axios.get(
                `https://givly-api.onrender.com/api/Delivery/delevery/${_id}`,
               
                config
              );
              return data;
            } catch (error) {
              if (!error?.response) {
                throw error;
              }
              return rejectWithValue(error?.response?.data);
            }
          },)


          export const deliverylivgetAction = createAsyncThunk(
            "deliverylivget",
            async (_, { rejectWithValue, getState, dispatch }) => {
              const { userAuth } = getState().users;
              try {
                const config = {
                  headers: { "Content-Type": "application/json" },
                };
                const { data } = await axios.get(
                  "https://givly-api.onrender.com/api/Delivery",
                  
                  config
                );
                return data;
              } catch (error) {
                if (!error?.response) {
                  throw error;
                }
                return rejectWithValue(error?.response?.data);
              }
            },)


            export const updateOwnerAction = createAsyncThunk(
              "updateOwner",
              async (result, { rejectWithValue, getState, dispatch }) => {
          
                try {
                  const config = {
                    headers: { "Content-Type": "application/json" },
                  };
                  const { data } = await axios.post(
                    "https://givly-api.onrender.com/api/Transaction/update/owner",
                    result,
                    config
                  );
                  return data;
                } catch (error) {
                  if (!error?.response) {
                    throw error;
                  }
                  return rejectWithValue(error?.response?.data);
                }
              },)

              ////////
              export const updateTakenAction = createAsyncThunk(
                "updateTaken",
                async (result, { rejectWithValue, getState, dispatch }) => {
                  const { userAuth } = getState().users;
                  try {
                    const config = {
                      headers: { "Content-Type": "application/json" },
                    };
                    const { data } = await axios.post(
                      "https://givly-api.onrender.com/api/Transaction/taken/update",
                      result,
                      config
                    );
                    return data;
                  } catch (error) {
                    if (!error?.response) {
                      throw error;
                    }
                    return rejectWithValue(error?.response?.data);
                  }
                },)
   
const deliverySlices = createSlice({
    name: "deliverys",
    initialState: {
    
      
    },

  
    extraReducers: (builder) => {
    
      builder.addCase(deliveryAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(deliveryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.created = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(deliveryAction.rejected, (state, action) => {
      
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });
    ///////delevery get
    builder.addCase(deliverygetAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(deliverygetAction.fulfilled, (state, action) => {
        state.loading = false;
        state.alldeliveries = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(deliverygetAction.rejected, (state, action) => {
    
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });
    //delivery get all for liv
    builder.addCase(deliverylivgetAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deliverylivgetAction.fulfilled, (state, action) => {
      state.loading = false;
      state.allLivdeliveries = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deliverylivgetAction.rejected, (state, action) => {
   
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
  });
/////delete
    builder.addCase(deliverydeleteAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(deliverydeleteAction.fulfilled, (state, action) => {
        state.loading = false;
        state.deleted = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(deliverydeleteAction.rejected, (state, action) => {
    
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });
    //////get one

    builder.addCase(deliverygetOneAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deliverygetOneAction.fulfilled, (state, action) => {
      state.loading = false;
      state.getOne = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deliverygetOneAction.rejected, (state, action) => {
   
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
  });
  /////transaction
  builder.addCase(transactionAction.pending, (state, action) => {
    state.loading = true;
    state.appErr = undefined;
    state.serverErr = undefined;
  });
  builder.addCase(transactionAction.fulfilled, (state, action) => {
    state.loading = false;
    state.createdtran = action?.payload;
    state.appErr = undefined;
    state.serverErr = undefined;
  });
  builder.addCase(transactionAction.rejected, (state, action) => {
  
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
});
///////////find by delivery
  
builder.addCase(updateOwnerAction.pending, (state, action) => {
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
});
builder.addCase(updateOwnerAction.fulfilled, (state, action) => {
  state.loading = false;
  state.finded = action?.payload;
  state.appErr = undefined;
  state.serverErr = undefined;
});
builder.addCase(updateOwnerAction.rejected, (state, action) => {

  state.loading = false;
  state.appErr = action?.payload?.message;
  state.serverErr = action?.error?.message;

});

/////////
 
builder.addCase(updateTakenAction.pending, (state, action) => {
  state.loading = true;
  state.appErr = undefined;
  state.serverErr = undefined;
});
builder.addCase(updateTakenAction.fulfilled, (state, action) => {
  state.loading = false;
  state.gettaken = action?.payload;
  state.appErr = undefined;
  state.serverErr = undefined;
});
builder.addCase(updateTakenAction.rejected, (state, action) => {

  state.loading = false;
  state.appErr = action?.payload?.message;
  state.serverErr = action?.error?.message;

});
  
},

});


export default deliverySlices.reducer;