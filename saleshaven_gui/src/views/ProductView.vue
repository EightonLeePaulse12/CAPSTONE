<template>
    <div class="products" v-if="products">
        <div class="container-fluid">
            <div class="row card-group row-cols-1 row-cols-sm-2 row-cols-lg-3 mx-auto g-4">
                <div class="col" v-for="product in products" :key="product.prodID">
                    <div class="card">
                        <img id="product" :src="product.prodURL">
                        <div class="card-body">
                            <h6 id="name">{{ product.prodName }}</h6>
                            <p id="description"> Description: {{ product.prodDesc }} </p>
                            <p id="category"> Category: {{ product.category }} </p>
                            <p id="price"> Price: {{ product.price }} </p>
                            <p id="stock"> Stock: {{ product.stock }} </p>
                            <center>
                                <div class="buttons" id="button">
                                    <button @click="singleProduct(product.prodID)">View More</button>
                                    <button @click="addToCart(product)">Add To Cart</button>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
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
            return this.$store.state.product
        },
        products() {
            return this.$store.state.products
        }
    },
    mounted() {
        this.$store.dispatch("fetchProducts")
    },
    methods: {
        addToCart(product) {
            console.log("Product to add: ", product)
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
#button {
    height: 30%;
}

#name {
    height: 15%;
}

#price {
    height: 10%;
}

#product {
    height: 20%;
}

#category {
    height: 5%;
}

#description {
    height: 20%;
}

.buttons {
    display: flex !important;
}

#else {
    display: flex;
    height: 70vh;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.spinner-border {
    height: 9rem;
    width: 9rem;
}

.products {
    color: white !important;
}

#product {
    aspect-ratio: 1/1;
    object-fit: cover;
}

.card {
    background: transparent !important;
    font-size: 0.7rem;
}

button {
    background: transparent;
    color: white;
    border: 1px solid white;
    padding: 10px;
    margin: 5px;
    cursor: pointer !important;
    font-weight: bold;
}

button:hover {
    background: white;
    color: rgb(2, 2, 5);
}

.card-body {
    color: white;
    border: 1px solid white;
    height: 20rem !important;
}</style>