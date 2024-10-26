import {
    createSlice
} from "@reduxjs/toolkit";
import {
    getUserDetails
} from "../../Service/GetUserDetails/GetUserDetails";


export const userReducer = createSlice({
    name: "user",
    initialState: {
        userData: {},
        token: sessionStorage.getItem("token") || null,
        isLoggedIn: sessionStorage.getItem("token") ? true : false,
    },
    reducers: {
        setUser: (state, action) => {
            const {
                token
            } = action.payload;
            state.token = token;
            state.isLoggedIn = true;
            const details = getUserDetails(token);
            state.userData = {
                ...details
            };

            sessionStorage.setItem("token", token)
            // console.log(state.userData);
        },
        userLogout: (state, action) => {
            sessionStorage.removeItem("token")
            state.userData = {};
            state.token = null;
            state.isLoggedIn = false;
        }
    }
})

export const {
    setUser,
    userLogout
} = userReducer.actions;