<template>
  <div>
    <div>
      <h2>Checkout</h2>
    </div>
    <div class="finish">
      <button @click="completePurchase">Complete Purchase</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  props: {
    total: Number,
  },
  methods: {
    completePurchase() {
      this.cart.forEach((item) => {
        const transactionData = {
          userID: this.$store.state.userData.userID,
          prodID: item.productID,
          transactionType: "buy",
          transactionDate: new Date().toISOString(),
        };
        this.$store.dispatch("recordTransaction", transactionData);
      });
    },
  },
};
</script>

<style scoped></style>
