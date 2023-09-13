<template>
  <div class="cart-container">
    <h2>Cart</h2>
    <ul class="cart-list">
      <li v-for="item in cart" :key="item.productID" class="cart-item">
        <div class="item-info">
          <span class="product-name">{{ item.prodName }}</span>
          <span class="item-price">Price: R{{ item.price }}</span>
          <span class="item-quantity">Quantity: {{ item.quantity }}</span>
        </div>
        <div class="item-actions">
          <button @click="removeFromCart(item.productID)" class="remove-button">Remove</button>
          <button @click="decreaseQuantity(item)" class="quantity-button">-</button>
          <button @click="increaseQuantity(item)" class="quantity-button">+</button>
        </div>
      </li>
    </ul>
    <p class="cart-total">Total: R{{ cartTotal }}</p>
    <router-link :to="{ name: 'checkout' }" class="checkout-link">
      Proceed to Checkout
    </router-link>
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

<style scoped>
.cart-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  color:black !important;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.cart-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

.item-info {
  flex: 1;
}

.product-name {
  font-weight: bold;
}

.item-actions {
  display: flex;
  align-items: center;
}

.remove-button,
.quantity-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.remove-button:hover,
.quantity-button:hover {
  background-color: #c0392b;
}

.cart-total {
  text-align: right;
  font-weight: bold;
  margin-top: 20px;
}

.checkout-link {
  display: block;
  text-align: center;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
}

.checkout-link:hover {
  background-color: #2980b9;
}
</style>