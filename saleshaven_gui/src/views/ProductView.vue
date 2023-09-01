<template>
    <div>
        <div class="container-fluid">
            <div class="row card-group row-cols-1 row-cols-sm-2 row-cols-lg-3 mx-auto g-4">
                <div class="col" v-for="product in products" :key="product.prodID">
                    <div class="card">
                        <img id="product" :src="product.prodURL">
                        <div class="card-body">
                            <h6>{{ product.prodName }}</h6>
                            <p> {{ product.prodDesc }} </p>
                            <p> {{ product.category }} </p>
                            <p> {{ product.price }} </p>
                            <p> {{ product.stock }} </p>
                            <p> {{ product.seller_id }} </p>
                            <div class="buttons">
                            <button>View More</button>
                            <button @click="addToCart(product)">Add To Cart</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        products() {
            return this.$store.state.products
        }
    },
    mounted() {
        this.$store.dispatch("fetchProducts")
    },
    methods:{
        addToCart(product){
            this.$store.dispatch('cart/addToCart', product)
        }
    }
}
</script>

<style scoped>
.buttons{
    display:flex !important;
}
</style>