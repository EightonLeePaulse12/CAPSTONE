<template>
  <div>
    <div class="checkout-container">
      <div class="checkout-header">
        <h2>Checkout</h2>
      </div>
      <div class="checkout-form">
        <div class="form-group">
          <label for="card-number">Card Number:</label>
          <input required type="text" id="card-number"
            oninvalid="this.setCustomValidity('Please provide your card number')" oninput="this.setCustomValidity('')"
            placeholder="Enter card number" v-model="cardNumber" />
        </div>
        <div class="form-group">
          <label for="expiry-date">Expiry Date:</label>
          <input required type="text" oninvalid="this.setCustomValidity('Please provide your card's expire date')"
            oninput="this.setCustomValidity('')" id="expiry-date" placeholder="MM/YY" v-model="expiryDate" />
        </div>
        <div class="form-group">
          <label for="cvv">CVV:</label>
          <input required type="text" id="cvv" oninvalid="this.setCustomValidity('Please enter your CCV number')"
            oninput="this.setCustomValidity('')" placeholder="Enter CVV" v-model="cvv" />
        </div>
        <button @click="completePurchase">Complete Purchase</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    };
  },
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
      // Here you can use this.cardNumber, this.expiryDate, and this.cvv to get the banking details.
      const userID = this.$store.state.userData.userID
      for (const item of this.cart) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
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

      this.$store.commit("clearCart")
      // Clear banking details after purchase
      this.cardNumber = "";
      this.expiryDate = "";
      this.cvv = "";
      this.$router.push("/success")
    }
  },
};
</script>

<style scoped>
.checkout-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 60px;
  background: transparent;
  border-radius: 5px;
  border: 1px solid white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.checkout-header {
  text-align: center;
  margin-bottom: 20px;
}

.checkout-form .form-group {
  margin-bottom: 20px;
}

.checkout-form label {
  font-weight: bold;
}

.checkout-form input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.checkout-form button {
  display: block;
  width: 100%;
  padding: 10px;
  background: transparent;
  color: #ffffff;
  border: 1px solid white;
  border-radius: 5px;
  margin-top: 50px;
  cursor: pointer !important;
}

.checkout-form button:hover {
  background-color: #ffffff;
  color: #040404;
}
</style>