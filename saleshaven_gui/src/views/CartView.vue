<template>
    <div>
        <div v-if="cart.length === 0">
            Your cart is empty
        </div>
        <div v-else>
            <Cart :total="cartTotal"></Cart>
        </div>
    </div>
</template>

<script>
import Cart from '@/components/Cart.vue'
export default {
    components: {
        Cart
    },
    computed: {
        userRole() {
            return this.$store.state.userRole
        },
        cart() {
            return this.$store.state.cart
        },
        cartTotal() {
            return this.$store.state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
        }
    },
    methods: {
        checkout() {
            this.$router.push({ name: 'checkout', params: { total: this.cartTotal } })
        }
    }
}
</script>

<style lang="scss" scoped></style>