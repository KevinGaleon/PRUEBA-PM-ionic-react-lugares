import { combineReducers } from '@reduxjs/toolkit';
import appHeaderReducer from './appHeaderReducer/appHeader';
import lugaresReducer from './lugares/lugares';

const rootReducer = combineReducers({
  appHeader: appHeaderReducer,
  lugares: lugaresReducer,
});

export default rootReducer;