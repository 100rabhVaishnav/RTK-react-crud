import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL=process.env.REACT_APP_USERS_URL;
//create action
export const createuser = createAsyncThunk("createuser", async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
        const response = await axios.post(`${BASE_URL}`, data);
        const result = response.data;
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
}
);

//read action
export const showUser = createAsyncThunk("showUser", async (args, { rejectWithValue }) => {
    const response = await axios.get(`${BASE_URL}`);
    try {
        const result = await response.data;
        console.log(result);
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
}
);

//delete action
export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {

    const response = await axios.delete(`${BASE_URL}/${id}`);
    try {
        const result = await response.data;
        const deleteUser = window.confirm("Are you sure to Delete");
        if (deleteUser) {
            console.log(result);
            return result;
        }

    } catch (error) {
        return rejectWithValue(error);
    }
}
);

//update action
export const updateUser = createAsyncThunk("updateUser", async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    const response = await axios.put(`${BASE_URL}/${data.id}`, data);
    console.log(response.data);
    try {
        const result = await response.data;
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
}
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {
        getUser(state, action) {
            state.push(action.payload);
            console.log("reducer", action.payload);
        }
    },
    extraReducers: {
        [createuser.pending]: (state) => {
            state.loading = true;
        },
        [createuser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        },
        [createuser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [showUser.pending]: (state) => {
            state.loading = true;
        },
        [showUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [showUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [deleteUser.pending]: (state) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if (id) {
                state.users = state.users.filter((ele) => ele.id !== id);
            }
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        [updateUser.pending]: (state) => {
            state.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = state.users.map((ele) =>
                ele.id === action.payload.id ? action.payload : ele
            );
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

    }
});
console.log(userSlice.actions);

export default userSlice.reducer;
export const { getUser } = userSlice.actions;