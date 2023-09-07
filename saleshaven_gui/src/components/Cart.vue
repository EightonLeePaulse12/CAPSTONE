<template>
  <div>
    <h2>Cart</h2>
    <ul>
      <li v-for="item in cart" :key="item.productID">
        {{ item.prodName }} - Price: {{ item.price }} - Quantity: {{ item.quantity }}
        <button @click="removeFromCart(item.productID)">Remove</button>
        <button @click="decreaseQuantity(item)">-</button>
        <button @click="increaseQuantity(item)">+</button>
      </li>
    </ul>
    <p>Total: R{{ cartTotal }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      const cart = this.$store.state.cart
      console.log(cart)
      return cart
    },
    cartTotal() {
      return this.$store.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },
  methods: {
    removeFromCart(productID) {
      this.$store.dispatch("removeFromCart", productID);
    },
    decreaseQuantity(item) {
      const updatedItem = { ...item, quantity: item.quantity - 1 }
      this.$store.dispatch("updateCartItem", updatedItem)
    },
    increaseQuantity(item) {
      const updatedItem = { ...item, quantity: item.quantity + 1 }
      this.$store.dispatch("updateCartItem", updatedItem)
    },
    // ... other methods
  },
};
</script>