<template>
<div class="table-responsive">
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
      return this.$store.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
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
  max-width: 1000px;
  margin: 10px auto;
  padding: 20px;
  color: rgb(255, 255, 255) !important;
  background: transparent;
  border: 1px solid #ffffff;
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
  background: transparent;
  border: 1px solid #ffffff;
  border-radius: 5px;
}

.item-price {
  margin-right: 20px;
}

.item-info {
  flex: 1;
}

.product-name {
  font-weight: bold;
  margin-right: 20px;
}

.item-actions {
  display: flex;
  align-items: center;
}

.remove-button,
.quantity-button {
  margin-left: 10px;
  padding: 5px 10px;
  background: transparent;
  color: #fff;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer !important;
}

.remove-button:hover,
.quantity-button:hover {
  background-color: white;
  color: #040404;
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
  background: transparent;
  border: 1px solid white;
  color: #ffffff;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer !important;
  margin-top: 20px;
}

.checkout-link:hover {
  background-color: #ffffff;
  color: #040404;
}
@media (width < 710px){
  .item-price{
    width:100% !important;
  }
  .cart-item{
    flex-direction: column;
  }
}
@media (width < 301px){
  .cart-container{
    padding:0 !important;
  }
  .cart-container{
    width:100% !important;
  }
  .checkout-link{
    margin-bottom:8px;
  }
  .cart-total{
    padding:5px;
  }
  h2{
    text-align: center;
  }
  .cart-item{
    padding:7px !important;
  }
}
</style>