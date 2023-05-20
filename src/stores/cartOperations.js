import { createSlice } from "@reduxjs/toolkit";

export const cartOperations = createSlice({
  name: "cart",
  initialState: {
    listCart: [],
  },
  reducers: {
    addItem: (state, actions) => {
      //check if i have already the item in the array
      console.log(state.listCart);
      console.log(actions.payload.id);
      const index = state.listCart.findIndex((el) => {
        //return el.productId === actions.payload.id;
        return el.id_product === actions.payload.id;
      });

      console.log(state.listCart);
      if (index > -1) {
        //se è già presente, ne aggiorno la quantità
        state.listCart[index].quantity =
          state.listCart[index].quantity + actions.payload.quantity;
        console.log("prodotto già presente, aggiorno");
      } else {
        console.log("prodotto non presente, lo aggiungo!");
        state.listCart.push({
          //productId: actions.payload.id,
          id_product: actions.payload.id,
          quantity: actions.payload.quantity,
        });
      }
    },

    updateItem: (state, actions) => {
      const objIndex = state.listCart.findIndex(
        (obj) => obj.id_product === actions.payload.id
      );

      state.listCart[objIndex].quantity = actions.payload.quantity;
      console.log("quantità aggiornata!");
    },
    removeItem: (state, actions) => {
      const index = state.listCart.findIndex(
        (el) => el.id_product === actions.payload.id
      );
      console.log(index);
      if (index > -1) {
        // only splice array when item is found
        state.listCart.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, updateItem, removeItem } = cartOperations.actions;

export default cartOperations.reducer;
