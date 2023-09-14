<template>
    <div v-if="role === 'User' || role === 'Admin' || role === 'Owner'">
        <div class="products" v-if="products">
            <div class="container-fluid p-3">
                <div class="row text-center pb-3">
                    <h2>Our Catalog</h2><br>
                    <p>Make yourself at home.</p>

                    <form class="d-flex mb-2 searchBTN" role="search">
                        <input class="form-control" type="search" id="search" placeholder="Search" aria-label="Search"
                            v-model="searchTerm" />
                    </form>
                    <div class="sort-dropdown">
                        <label for="sort" id="sort2">Sort by: </label>
                        <select id="sort" v-model="sortBy">
                            <option value="default">Default</option>
                            <option value="price">Price</option>
                            <option value="category">Category</option>
                            <option value="alphabetical">Alphabetical</option>
                        </select>
                        <button class="btn" @click="toggleSortDirection">
                            {{ sort === 'asc' ? 'ascending' : 'descending' }}
                        </button>
                    </div>
                    <div class="reset">
                        <button class="btn" @click="resetFilters">
                            Reset
                        </button>
                    </div>
                </div>
                <div class="row card-group row-cols-1 row-cols-sm-2 row-cols-lg-3 mx-auto g-4">
                    <div class="col" v-for="product in filteredProducts" :key="product.prodID">
                        <div class="card" data-aos="fade-up">
                            <img loading="lazy" id="product" :src="product.prodURL">
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
    </div>
    <div v-else id="else">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch("fetchProducts")
    },
    data() {
        return {
            searchTerm: '',
            sortBy: "",
            sort: ""
        }
    },
    computed: {
        product() {
            return this.$store.state.product
        },
        role() {
            return this.$store.state.userRole
        },
        products() {
            return this.$store.state.products
        },
        filteredProducts() {
            let filtered = this.products
            if (this.searchTerm !== '') {
                filtered = filtered.filter(product => product.prodName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(this.searchTerm.toLowerCase()))
            }
            if (this.sortBy === 'price') {
                filtered = filtered.sort((a, b) => (this.sort === 'asc' ? a.price - b.price : b.price - a.price))
            } else if (this.sortBy === 'category') {
                filtered = filtered.sort((a, b) => a.category.localeCompare(b.category) * (this.sort === 'asc' ? 1 : -1))
            } else if (this.sortBy === 'alphabetical') {
                filtered = filtered.sort((a, b) => a.prodName.localeCompare(b.prodName) * (this.sort === 'asc' ? 1 : -1))
            } else if (this.sortBy === 'default') {
                filtered = filtered.sort((a, b) => (this.sort === 'asc' ? a.prodID - b.prodID : b.prodID - a.prodID))
            }

            return filtered
        },
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
        },
        searchProducts(e) {
            console.log(this.searchTerm)
            e.preventDefault()
            this.searchTerm = this.searchTerm.trim()
        },
        toggleSortDirection() {
            this.sort = this.sort === 'asc' ? 'desc' : 'asc'
        },
        resetFilters() {
            this.sortBy = "default"
            this.sort = ''
            this.searchTerm = ''
        },
        clearSearch() {
            this.searchTerm = ''
        },
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

#sort {
    border-radius: 10px;
    height: 3rem;
    background: transparent;
    color: white;
}

.btn {
    margin: 10px !important;
}

option {
    background: transparent !important;
    color: rgb(0, 0, 0) !important;
    border: 1px solid black;
}

#sort option:hover {
    background: rgb(1, 1, 1) !important;
    color: rgb(255, 255, 255) !important;
}

#search {
    width: 100%;
    height: 3rem !important;
    color: white;
    background: transparent;
}

#search::placeholder {
    color: white;
}

.buttons {
    display: flex !important;
}

#sort2 {
    margin-right: 10px;
    font-weight: bold;
}

#else {
    display: flex;
    height: 70vh;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.sort-dropdown {
    display: flex;
    flex-direction: row;
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
}
@media (width < 301px){
    #name{
        font-size:15px;
    }
    #description{
        font-size:11px;
    }
}
</style>