import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: localStorage.getItem("orderId"),
  orderCode: null,
  statusOrder: false,
  statusPayment: false,
  message: "",
  orderFoods: [],
  hasUpdate: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearCart: (state) => {
      state.orderFoods = [];
    },
    clearOrder: (state) => {
      state.orderId = null;
      state.orderCode = null;
      state.statusOrder = false;
      state.statusPayment = false;
      state.message = "";
      state.orderFoods = [];
      localStorage.removeItem("orderId");
    },
    addToCart: (state, action) => {
      const orderItem = action.payload;
      const itemIndex = state.orderFoods.findIndex(
        (x) => x.id === orderItem.id
      );

      if (itemIndex > -1) {
        state.orderFoods[itemIndex].quantity += 1;
        if (orderItem.note) {
          state.orderFoods[itemIndex].note = orderItem.note;
        }
      } else {
        state.orderFoods = [...state.orderFoods, { ...orderItem, quantity: 1 }];
      }
    },
    saveToCart: (state, action) => {
      const orderItem = action.payload;
      const itemIndex = state.orderFoods.findIndex(
        (x) => x.id === orderItem.id
      );
      if (itemIndex > -1) {
        state.orderFoods[itemIndex].quantity = orderItem.quantity;
        state.orderFoods[itemIndex].note = orderItem?.note;
      } else {
        state.orderFoods = [...state.orderFoods, { ...orderItem, quantity: 1 }];
      }
    },
    decreaseCart: (state, action) => {
      const orderItem = action.payload;
      const itemIndex = state.orderFoods.findIndex(
        (x) => x.id === orderItem.id
      );
      state.orderFoods[itemIndex].quantity -= 1;
    },
    removeFromCart: (state, action) => {
      const orderId = action.payload;
      state.orderFoods = state.orderFoods.filter((x) => x.id !== orderId);
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setOrderCode: (state, action) => {
      state.orderCode = action.payload;
    },
    setStatusOrder: (state, action) => {
      state.statusOrder = action.payload;
    },
    setStatusPayment: (state, action) => {
      state.statusPayment = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setUpdate: (state, action) => {
      state.hasUpdate = action.payload;
    },
  },
});

export const selectMenuItems = (state) => state.cart.cartItems;
export const selectMenuItemWithId = (state, id) =>
  state.cart.orderFoods.find((item) => item.id === id);
export const calculateTotalItemsWithId = (state, id) => {
  return state.cart.orderFoods
    .filter((item) => item.id === id)
    .reduce((total, item) => (total += item.quantity), 0);
};

export const calculateTotalItemsWithIdNote = (state, food) => {
  return state.cart.orderFoods
    .filter(
      (item) =>
        item.id === food.id &&
        (item.note || "").toLowerCase() === (food.note || "").toLowerCase()
    )
    .reduce((total, item) => (total += item.currentQuantity), 0);
};

export const calculateTotalItems = (state) =>
  state.cart.orderFoods.reduce((total, item) => (total += item.quantity), 0);
export const calculateTotalMoney = (state) =>
  state.cart.orderFoods.reduce(
    (price, item) => item.price * item.quantity + price,
    0
  );

export const {
  setLoading,
  clearCart,
  clearOrder,
  addToCart,
  saveToCart,
  removeFromCart,
  decreaseCart,
  setOrderId,
  setOrderCode,
  setStatusOrder,
  setStatusPayment,
  setMessage,
  setUpdate
} = cartSlice.actions;
export default cartSlice.reducer;
