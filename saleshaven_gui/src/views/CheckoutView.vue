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
    async completePurchase() {
      const userID = this.$store.state.userData.userID
      for (const item of this.cart) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        const transactionData = {
          userID: userID,
          prodID: item.productID,
          transactionType: "buy",
          transactionDate: formattedDate
        }
        await this.$store.dispatch("recordTransaction", transactionData);

      }
    }
  },
};
</script>

<style scoped></style>
