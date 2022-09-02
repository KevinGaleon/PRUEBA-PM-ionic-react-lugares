import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LugaresState, Lugar } from './lugares.interfaces';

const initialState: LugaresState = {
  lugaresList: [
    {
      code: 1,
      title: 'Torre Eiffel',
      description: [],
      photo: 'https://static6.depositphotos.com/1004999/568/i/950/depositphotos_5681016-stock-photo-the-eiffel-tower.jpg',
    },
    {
      code: 2,
      title: 'Machu Pichu',
      description: [],
      photo: 'http://c.files.bbci.co.uk/152EB/production/_108936768_g3744.jpg',
    },
  ],
  lugarSelected: {} as Lugar,
}

export const lugaresSlice = createSlice({
  name: 'lugares',
  initialState,
  reducers: {
    setLugaresList: (state: LugaresState, action: PayloadAction<Lugar[]>) => {
      state.lugaresList = action.payload;
      localStorage.setItem('lugaresList', JSON.stringify(state.lugaresList));
    },
    updateLugar: (state: LugaresState, action: PayloadAction<{lugar: Lugar, index: number }>)  => {
      state.lugaresList[action.payload.index] = action.payload.lugar;
      localStorage.setItem('lugaresList', JSON.stringify(state.lugaresList));
    },
    updateDescriptions: (state: LugaresState, action: PayloadAction<{ code: number, descriptions: string[]}>) => {
      const index = state.lugaresList.findIndex(lugar => lugar.code === action.payload.code);
      if (index > -1) {
        state.lugaresList[index].description = action.payload.descriptions;
        state.lugarSelected = state.lugaresList[index];
      }
    },
    setLugarSelected: (state: LugaresState, action: PayloadAction<Lugar>) => {
      state.lugarSelected = action.payload;
    },
  },
});

export const { setLugaresList, setLugarSelected, updateDescriptions, updateLugar } = lugaresSlice.actions;
export default lugaresSlice.reducer;