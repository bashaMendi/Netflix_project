import { configureStore } from "@reduxjs/toolkit";
import resultReducer from './featrues/resultSlice'
import upComingSlice from "./featrues/upComingSlice";
import topRitedSlice from "./featrues/topRitedSlice";
import watchAgenSlice from "./featrues/watchAgenSlice";
import singleSlice from "./featrues/singleSlice";
import moviesReducer from "./featrues/moviesSlice";
import authReducer from "./featrues/authSlice";
import searchReducer from "./featrues/saerchSlice";
import screensReducer from './featrues/screenSlice';
import shopReducer from './featrues/shopSlice';
import tvReducer from './featrues/tvSlice'


const myStore = configureStore({
  reducer: {
    resultReducer,
    upComingSlice,
    topRitedSlice,
    watchAgenSlice,
    singleSlice,
    moviesReducer,
    authReducer,
    searchReducer,
    screensReducer,
    shopReducer,
    tvReducer,
  },
});

export default myStore;
