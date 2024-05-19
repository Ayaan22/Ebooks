import {configureStore} from '@reduxjs/toolkit';
import WishlistReducer from './WishlistSlice';


const store = configureStore({
  reducer: {
    wishlist: WishlistReducer,
  },
});

export default store;
