const { createSlice } = require("@reduxjs/toolkit");

const CartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, actions) => {
            const isAvailable = state.find(
                (value) => value.name == actions.payload.name
            );
            if (isAvailable) {
                actions.payload["quantity"] += 1;
            } else {
                state.push({ ...actions.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, actions) => {
            const newList = state.filter(
                (value) => value.name != actions.payload.name
            );
            return (state = newList);
        },
        incrementQuantity: (state, actions) => {
            const isAvailable = state.find(
                (value) => value.name == actions.payload.name
            );

            if (isAvailable) {
                isAvailable.quantity++;
            } else {
                console.log("not available");
            }
        },
        decrementQuantity: (state, action) => {
            const { name } = action.payload;
            const index = state.findIndex(item => item.name === name);

            if (index !== -1) {
                const currentItem = state[index];

                if (currentItem.quantity === 1) {

                    state.splice(index, 1);
                } else {

                    state[index].quantity--;
                }
            }
        }
    },
});

export const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;