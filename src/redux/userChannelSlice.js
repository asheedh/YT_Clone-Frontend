import { createSlice } from "@reduxjs/toolkit";

// userchannelslice for tracking user channel
const userChannelSlice = createSlice({
    name: "userChannel",
    initialState: {
        userChannelDetails: {},
    },
    reducers: {
        setUserChannelDetails: (state, action) => {
            console.log("User channel details:", action.payload);
            state.userChannelDetails = action.payload; // Directly assign payload
        },
        clearUserChannelDetails: (state) => {
            state.userChannelDetails = {};
        },
    }
});

// Exporting default reducer
export default userChannelSlice.reducer;

// Named exporting reducer functions
export const { setUserChannelDetails, clearUserChannelDetails } = userChannelSlice.actions;
