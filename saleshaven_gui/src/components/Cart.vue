<template>
    <div>
      <h2>Cart</h2>
      <ul>
        <li v-for="product in cart" :key="product.prodID">
          {{ product.prodName }} - Price: {{ product.price }}
          <button @click="removeFromCart(product.prodID)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      cart() {
        return this.$store.getters.cart;
      },
    },
    methods: {
      removeFromCart(prodID) {
        this.$store.dispatch('removeFromCart', prodID);
      },
    },
  };
  </script>