import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userChannelReducer from "./userChannelSlice";  // Corrected import name

const store = configureStore({
    reducer: {
        auth: authReducer,
        userChannel: userChannelReducer,  // Updated key name
    },
});

export default store;
