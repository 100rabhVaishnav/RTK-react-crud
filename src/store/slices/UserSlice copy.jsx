import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        users:[],
        loading:false,
        error:null,
    },
    reducers: {
        getUser(state, action) { 
           state.push(action.payload);
           console.log("reducer",action.payload);
        }
    }
});
console.log(userSlice.actions);

export default userSlice.reducer;
export const { getUser } =userSlice.actions;