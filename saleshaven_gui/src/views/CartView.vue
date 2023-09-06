<template>
    <div>
        <div v-if="!cart">
            Your cart is empty
        </div>
        <Cart></Cart>
    </div>
</template>

<script>
import Cart from '@/components/Cart.vue'
    export default {
        components:{
            Cart
        },
        computed:{
            userRole(){
                return this.$store.state.userRole
            },
            cart(){
                return this.$store.state.cart
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>