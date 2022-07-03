import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type IsAuthType = {
  token: string;
  isAuth: boolean;
};

const isAuthSlice = createSlice({
  name: 'is-auth',
  initialState: {
    token: '',
    isAuth: false,
  },
  reducers: {
    setIsAuth: (state, action: PayloadAction<IsAuthType>) => {
      state.isAuth = action.payload.isAuth;
      state.token = action.payload.token;
    },
  },
});

const {setIsAuth} = isAuthSlice.actions;

export default isAuthSlice.reducer;
export {setIsAuth};
