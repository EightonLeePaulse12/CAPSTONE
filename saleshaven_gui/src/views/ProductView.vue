<template>
    <div v-if="products">
        <div class="container-fluid">
            <div class="row card-group row-cols-1 row-cols-sm-2 row-cols-lg-3 mx-auto g-4">
                <div class="col" v-for="product in products" :key="product.prodID">
                    <div class="card">
                        <img id="product" :src="product.prodURL">
                        <div class="card-body">
                            <h6>{{ product.prodName }}</h6>
                            <p> Description: {{ product.prodDesc }} </p>
                            <p> Category: {{ product.category }} </p>
                            <p> Price: {{ product.price }} </p>
                            <p> Stock: {{ product.stock }} </p>
                            <div class="buttons">
                                <button @click="singleProduct(product.prodID)">View More</button>
                                <button @click="addToCart(product)">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        products() {
            return this.$store.state.products
        },
        product() {
            return this.$store.state.product
        }
    },
    mounted() {
        this.$store.dispatch("fetchProducts")
    },
    methods: {
        addToCart(product) {
            this.$store.dispatch('addToCart', product)
        },
        singleProduct(prodID) {
            const chosenProd = this.products.find(product => product.prodID === prodID)
            if (chosenProd) {
                this.$store.commit("setSelectedProduct", chosenProd)
                this.$router.push({ name: "ProductView", params: { prodID: chosenProd.prodID } })
            }
        }
    }
}
</script>

<style scoped>
.buttons {
    display: flex !important;
}

#product {
    aspect-ratio: 1/1;
    object-fit: cover;
}

.card-body {
    height: 20rem !important;
}
</style>