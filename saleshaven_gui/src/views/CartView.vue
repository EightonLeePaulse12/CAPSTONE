<template>
    <div>

    </div>
</template>

<script>
export default {
    computed:{
        cart(){
            return this.$store.getters['cart/cart']
        },
        cartTotal(){
            return this.$store.getters['cart/cartTotal']
        }
    },
    methods:{
        removeFromCart(product){
            
        }
    }
}
</script>

<style scoped></style>