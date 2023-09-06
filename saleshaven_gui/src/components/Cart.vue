<template>
  <div>
    <h2>Cart</h2>
    <ul>
      <li v-for="product in cart" :key="product.productID">
        {{ product.prodName }} - Price: {{ product.price }} - Quantity: {{ product.quantity }}
        <button @click="removeFromCart(product.prodID)">Remove</button>
        <input type="number" v-model="product.quantity" @input="updateCart(product)">
      </li>
    </ul>
    <p>Total: {{ cartTotal }}</p>
  </div>
</template>
  
  <script>
  export default {
    computed: {
      cart() {
        return this.$store.getters.cart;
      },
      cartTotal(){
        return this.$store.getters.cartTotal
      }
    },
    methods: {
      removeFromCart(prodID) {
        this.$store.dispatch('removeFromCart', prodID);
      },
      updateCart(product){
        this.$store.dispatch("updateCartItem", product)
      }
    },
  };
  </script>