import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("userdata")?JSON.parse(localStorage.getItem("userdata")):null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginInformation: (state, action) => {
   
      state.value =action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { userLoginInformation } = userSlice.actions

export default userSlice.reducer