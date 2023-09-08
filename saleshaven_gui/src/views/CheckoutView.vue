<template>
    <div>
        <div>
            <h2>Checkout</h2>
          </div>
          <div class="finish">
            <button @click="complete">Complete Purchase</button>
          </div>
    </div>
</template>

<script>
export default {
    props:{
        total: Number
    },
    complete(){
        const transData = {
            userID: this.$store.state.userData.userID,
            prodID: this.selectedProduct.prodID
        }
    }
}
</script>

<style scoped></style>