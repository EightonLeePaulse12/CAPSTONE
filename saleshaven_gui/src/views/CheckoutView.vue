<template>
    <div>
        <div>
            <h2>Checkout</h2>
          </div>
          <div class="finish">
            <button @click="recordTransaction">Complete Purchase</button>
          </div>
    </div>
</template>

<script>
export default {
    props:{
        total: Number
    }
}
</script>

<style scoped></style>