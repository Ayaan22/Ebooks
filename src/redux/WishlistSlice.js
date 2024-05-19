import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
};

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      const getTitle = item => item?.title || item?.work?.title;

      // Check if the item already exists in the wishlist
      const existingItem = state.wishlist.find(
        item => getTitle(item) === getTitle(newItem),
      );

      if (!existingItem) {
        state.wishlist.push(newItem);
      }
    },
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      const getTitle = item => item?.title || item?.work?.title;

      state.wishlist = state.wishlist.filter(item => getTitle(item) !== itemId);
    },
  },
});

// const WishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState,
//   reducers: {
//     addToWishlist: (state, action) => {
//       const newItem = action.payload;
//       // Check if the item already exists in the wishlist
//       const existingItem = state.wishlist.find(
//         item => item.work.title === newItem.work.title,
//       );
//       if (!existingItem) {
//         state.wishlist.push(newItem);
//       }
//     },
//     removeFromWishlist: (state, action) => {
//       const itemId = action.payload;
//       state.wishlist = state.wishlist.filter(
//         item => item.work.title !== itemId,
//       );
//     },
//   },
// });

export const {addToWishlist, removeFromWishlist} = WishlistSlice.actions;
export default WishlistSlice.reducer;
