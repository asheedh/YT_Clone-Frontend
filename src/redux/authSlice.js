import { createSlice } from "@reduxjs/toolkit";

// Load stored auth state from localStorage
const storedAuth = JSON.parse(localStorage.getItem("auth")) || {
    user: null,
    token: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState: storedAuth,  // Load stored auth state
    reducers: {
        signin: (state, action) => {
            console.log("Redux Payload:", action.payload); // Debugging
            state.user = action.payload.user;
            state.token = action.payload.jwtToken;
            console.log("User id",state.user._id)
            state.isAuthenticated = true;

            // Save to localStorage
            localStorage.setItem("auth", JSON.stringify(state));
        },
        signout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            // Remove from localStorage
            localStorage.removeItem("auth");
        }
    }
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
