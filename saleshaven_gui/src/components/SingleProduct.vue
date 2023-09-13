<template>
    <div class="container mt-4" v-if="product">
        <div class="row">
            <div class="col-md-6">
                <img :src="product.prodURL" :alt="product.prodName" class="img-fluid" />
            </div>
            <div class="col-md-6">
                <h2>{{ product.prodName }}</h2>
                <p class="text-muted">{{ product.category }}</p>
                <p class="font-weight-bold">Price: R{{ product.price }}</p>
                <p>Stock: {{ product.stock }} available</p>
                <p>{{ product.prodDesc }}</p>
                <!-- Add any additional product details here -->
                <button class="btn btn-primary" id="prim" @click="back">Go Back</button>
            </div>
        </div>
    </div>
    <div v-else id="else">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>
  
<script>
export default {
    computed: {
        product() {
            return this.$store.state.selectedProduct;
        },
    },
    methods: {
        back() {
            this.$router.push('/products')
        }
    }
};
</script>
  
<style scoped>
/* Add custom styles here */
.img-fluid {
    max-height: 300px;
    width: auto;
}

#else {
    display: flex;
    height: 70vh;
    width: 100%;
    justify-content: center;
    align-items: center;
}
.container{
    padding:6rem;
}
.btn-primary{
    background:transparent !important;
    color:white !important;
    border:1px solid white;
    cursor: pointer !important;
}
#prim:hover{
    background:white !important;
    color: #040309 !important;
}
h2 {
    margin-top: 0;
}
.text-muted{
    color:white !important;
}
.btn-primary {
    margin-top: 20px;
}
</style>