import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderState } from './appHeader.interfaces';

const initialState: HeaderState = {
  title: 'Lugares',
  subtitle: '',
  icon: '',
}

export const appHeaderSlice = createSlice({
  name: 'appHeader',
  initialState,
  reducers: {
    setAppHeaderTitle: (state: HeaderState, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setAppHeaderSubtitle: (state: HeaderState, action: PayloadAction<string>) => {
      state.subtitle = action.payload;
    },
    setAppHeaderIcon: (state: HeaderState, action: PayloadAction<string>) => {
      state.icon = action.payload;
    },
  },
});

export const { setAppHeaderTitle, setAppHeaderIcon, setAppHeaderSubtitle } = appHeaderSlice.actions;
export default appHeaderSlice.reducer;