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
      removeFromCart(productID) {
        this.$store.dispatch('removeFromCart', productID);
      },
      decreaseQuantity(item){
        if(item.quantity > 1){
          item.quantity -= 1
          this.$store.dispatch("updateCartItem", item)
        }
      },
      updateCart(product){
        this.$store.dispatch("updateCartItem", product)
      }
    },
  };
  </script>