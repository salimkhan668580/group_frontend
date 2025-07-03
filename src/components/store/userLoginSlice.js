import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {

    setLoginData: (state, action) => {
      state.value = action.payload
    },
  },
})


export const { setLoginData } = userLoginSlice.actions

export default userLoginSlice.reducer