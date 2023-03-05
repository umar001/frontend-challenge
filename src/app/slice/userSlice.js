import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userData",
    initialState: {
        newsDataSource: { id: "guardianAPI", txt: "The Guardian API", category: "", author: "" }
    },
    reducers: {
        addPersonalizeFeed: (state, { payload }) => {
            state['personalizeFeed'] = payload
        },
        addNewsDataSource: (state, { payload }) => {
            state['newsDataSource'] = payload
        },
        addUserDetails: (state, { payload }) => {
            state['userDetails'] = payload
        }
    }
})

export const { addPersonalizeFeed, addNewsDataSource, addUserDetails } = userSlice.actions

export const userData = (state) => state.userData

export default userSlice.reducer